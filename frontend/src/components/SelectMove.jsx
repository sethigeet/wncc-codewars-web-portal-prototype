import { useRef } from "react";

export function SelectMove({ sendMove }) {
  const inputRef = useRef(null);

  return (
    <form
      className="text-center"
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputRef.current && inputRef.current.files.length === 0) return;

        const fileReader = new FileReader();
        fileReader.onload = async (e) => {
          const text = e.target.result;

          const exports = {};
          eval(`
          (function(exports) {
            ${text}
            exports.getMove = getMove;
          })(exports)
          `);
          sendMove(exports.getMove());
        };

        fileReader.readAsText(inputRef.current.files[0]);
      }}
    >
      <div className="form-control">
        <input
          ref={inputRef}
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          accept=".js"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-6">
        Send Move
      </button>
    </form>
  );
}
