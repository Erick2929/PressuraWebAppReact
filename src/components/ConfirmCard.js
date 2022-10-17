import Card from "./Card.js";
import "./ConfirmCard.css";

const closeModal = (e, onClickCancel) => {
  if (!e.target.classList.contains("modal-fade")) return;
  onClickCancel();
};

const ConfirmCard = ({
  confirmLabel,
  title,
  onClickConfirm,
  onClickCancel,
  children,
}) => {
  return (
    <div className="modal-fade" onMouseUp={(e) => closeModal(e, onClickCancel)}>
      <Card className="confirm-card">
        <div className="body">
          <h2>{title}</h2>
          {children}
        </div>
        <ul className="buttons">
          <li className="button-confirm" onClick={onClickConfirm}>
            <a href="#">{confirmLabel}</a>
          </li>
          <li className="button-cancel" onClick={onClickCancel}>
            <a href="#">Cancelar</a>
          </li>
        </ul>
      </Card>
    </div>
  );
};

ConfirmCard.defaultProps = {
  title: "Título",
  confirmLabel: "Aceptar",
};

export default ConfirmCard;
