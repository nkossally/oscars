export const NominationCard = ({ year, category, detail, isWinner , note}) => {
  return (
    <div className={"nomination-card"}>
      <div>{year}</div>
      <div>{category}</div>
      {detail && <div className="nomination-detail">{detail}</div>}
      <div className={isWinner ? "nomination-card-winner" : ""}>
        {isWinner ? "Winner" : "Nominee"}
        {note && <div className="nomination-note">* {note}</div>}
      </div>
    </div>
  );
};
