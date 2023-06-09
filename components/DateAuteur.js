import moment from "moment";

const DateAuteur = ({ date, auteur, style, wrap }) => {
  return (
    <div
      className={`${
        style ? style : "py-2  text-secondary-500"
      } items-center gap-1 text-[11px] font-semibold uppercase tracking-wide sm:flex`}
    >
      <p className="whitespace-nowrap">
        {moment(date).format("YYYY-MM-DD")}
        <span className={`${style ? style : "text-black"}`}> - </span>
      </p>
      <p className="lg:whitespace-nowrap">{auteur}</p>
    </div>
  );
};

export default DateAuteur;
