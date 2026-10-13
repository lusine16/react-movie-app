
import "./Loader.css";

type LoaderProps = {
  label?: string;
};

export function Loader({ label = "Загрузка..." }: LoaderProps) {
  return (
    <div className="loader" role="status">
      <span className="loader__spinner" aria-hidden="true" />
      <span className="loader__text">{label}</span>
    </div>
  );
}
