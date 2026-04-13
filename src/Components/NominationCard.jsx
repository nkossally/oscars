export const NominationCard = ({ year, category, detail, isWinner }) => {
  return (
    <div className={"nomination-card"}>
      <div>{category}</div>
      {detail && <div className="nomination-detail">{detail}</div>}
      <div>{year}</div>
      <div>{isWinner ? "Winner" : "Nominee"}</div>
    </div>
  );
};
