import UploadForm from "../components/UploadForm";
import Varal from "../components/Varal";

export default function Home() {
  return (
    <div>
      <h1>Varal de Poemas</h1>
      <UploadForm />
      <Varal />
    </div>
  );
}