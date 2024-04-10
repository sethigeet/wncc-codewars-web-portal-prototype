export function SelectMove({ selectedMove, setSelectedMove, sendMove }) {
  return (
    <form
      className="text-center"
      onSubmit={(e) => {
        e.preventDefault();
        sendMove(selectedMove);
      }}
    >
      <div className="form-control w-52">
        <label className="label cursor-pointer">
          <span className="label-text text-xl">Rock</span>
          <input
            type="radio"
            name="selected-move"
            className="radio radio-primary"
            value="rock"
            checked={selectedMove === "rock"}
            onChange={(e) => setSelectedMove(e.target.value)}
          />
        </label>
      </div>

      <div className="form-control w-52">
        <label className="label cursor-pointer">
          <span className="label-text text-xl">Paper</span>
          <input
            type="radio"
            name="selected-move"
            className="radio radio-primary"
            value="paper"
            checked={selectedMove === "paper"}
            onChange={(e) => setSelectedMove(e.target.value)}
          />
        </label>
      </div>

      <div className="form-control w-52">
        <label className="label cursor-pointer">
          <span className="label-text text-xl">Scissors</span>
          <input
            type="radio"
            name="selected-move"
            className="radio radio-primary"
            value="scissors"
            checked={selectedMove === "scissors"}
            onChange={(e) => setSelectedMove(e.target.value)}
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary mt-6">
        Send Move
      </button>
    </form>
  );
}
