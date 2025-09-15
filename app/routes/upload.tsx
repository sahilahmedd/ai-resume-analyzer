import { prepareInstructions } from "~/../constants";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

const upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore()
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyse = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
      }) => {
      setIsProcessing(true);
      setStatusText("Uploading Resume...");
      const uploadedFile = await fs.upload([file])
      if (!uploadedFile) return setStatusText("Failed to upload file, please try again later.");
      
      setStatusText("Converting Resume to image...");
    const imageFile = await convertPdfToImage(file);
    console.log(imageFile);
    
      if (!imageFile.file) return setStatusText("Failed to convert PDF to image, please try again later.");
      
      setStatusText("Uploading Image...");

      const uploadedImage = await fs.upload([imageFile.file])
      if (!uploadedImage) return setStatusText("Failed to upload image, please try again later.");

      setStatusText("Analyzing Resume...");

      const uuid = generateUUID();

      const data = {
          id: uuid,
          resumePath: uploadedFile.path,
          imagePath: uploadedImage.path,
          companyName, jobTitle, jobDescription,
          feedback: ""
      }

      await kv.set(`resume: ${uuid}`, JSON.stringify(data))

      setStatusText("Generating AI feedback...");

      const feedback = await ai.feedback(
          uploadedFile.path,
          prepareInstructions({jobTitle, jobDescription})
      )
      
      if (!feedback) return setStatusText("Failed to get AI feedback, please try again later.");
      
      const feedbackText = typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text
      
      data.feedback = JSON.parse(feedbackText)

        await kv.set(`resume: ${uuid}`, JSON.stringify(data));
      setStatusText("Analysis complete! Redirecting...");
      
      console.log(data);
      
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget.closest("form");

    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-decsription") as string;

      if (!file) return;

    handleAnalyse({companyName, jobTitle, jobDescription, file})
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart Feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>Upload your resume and get AI-powered feedback</h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              action=""
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-decsription">Job Decsription</label>
                <textarea
                  rows={5}
                  name="job-decsription"
                  placeholder="Job Decsription"
                  id="job-decsription"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className="primary-button" type="submit">
                Analyse Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
