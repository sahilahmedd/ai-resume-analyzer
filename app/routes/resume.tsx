import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summery from "~/components/Summery";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind - Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

const Resume = () => {
    console.log("Resume component mounted!");
  const { auth, fs, kv, isLoading } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
     console.log("Effect started, id:", id);
    const loadResume = async () => {
      const resume = await kv.get(`resume: ${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });

      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);
      console.log("Resume URL: ", {resumeUrl});
      

      const imageBlob = await fs.read(data.imagePath);
        if (!imageBlob) return;
        
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
      console.log("Image URL inside: ", {imageUrl});
      

      setFeedback(data.feedback);
      console.log("Image URL: ", {imageUrl});
    };

    loadResume();
  }, [id]);

//   useEffect(() => {
//   console.log("Effect started, id:", id);

//   const loadResume = async () => {
//     try {
//       if (!kv || !fs) {
//         console.warn("kv or fs not ready yet");
//         return;
//       }

//       const resume = await kv.get(`resume:${id}`);
//       console.log("kv.get result:", resume);

//       if (!resume) return;

//       const data = JSON.parse(resume);
//       console.log("parsed data:", data);

//       const resumeBlob = await fs.read(data.resumePath);
//       console.log("fs.read resume:", resumeBlob);

//       const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
//       setResumeUrl(URL.createObjectURL(pdfBlob));

//       const imageBlob = await fs.read(data.imagePath);
//       console.log("fs.read image:", imageBlob);

//       setImageUrl(URL.createObjectURL(imageBlob));
//       setFeedback(data.feedback);
//     } catch (err) {
//       console.error("loadResume failed:", err);
//     }
//   };

//   loadResume();
// }, [id, kv, fs]);

  console.log("Image URL outside: ", { imageUrl , resumeUrl, feedback });
  console.log("Loading state: ", id);
  
  

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img
            src="/icons/back.svg"
            alt="back button"
            className="w-2.5 h-2.5"
          />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg)] bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noreferrer">
                <img
                  src={imageUrl}
                  alt="image preview"
                  className="h-full w-full object-contained rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summery feedback={feedback} />
              <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
              <Details feedback={feedback} />
            </div>
          ) : (
              <img src="/images/resume-scan-2.gif" alt="searching..." className="w-full" />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
