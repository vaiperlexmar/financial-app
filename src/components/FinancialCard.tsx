import MasterCardImg from "../assets/card_systems/mastercard.svg";
import MirImg from "../assets/card_systems/mir.svg";
import VisaImg from "../assets/card_systems/visa.svg";

// shapes for cards backgorund
import fourXShape from "../assets/card_systems/4xshape.svg";
import eigthXShape from "../assets/card_systems/8xshape.svg";

import { Card } from "../types";

export default function FinancialCard({
  vendor,
  balance,
  last4,
  cardName,
  cardColor,
}: Card) {
  let vendorImg;

  switch (vendor) {
    case "mastercard":
      vendorImg = MasterCardImg;
      break;
    case "mir":
      vendorImg = MirImg;
      break;
    case "visa":
      vendorImg = VisaImg;
      break;
  }

  return (
    <li className={`card card_${cardColor}`}>
      <header className="card__header">
        <img alt="" className="card__icon" src={vendorImg} />
        {cardName && <p className="card__label">{cardName}</p>}
        {last4 && <p className="card__label">**** {`${last4}`}</p>}
      </header>
      <p className="card__balance">${`${balance}`}</p>
      <img
        alt=""
        className="card__background-shape"
        src={cardColor === "black" ? fourXShape : eigthXShape}
      />
    </li>
  );
}
