import './reserveInfo.css';

const ReserveInfo = ({ info, handleChangeInfo, isNotCreditCard }) => {
  return (
    <div className="rInfo">
      <b>Reserve Info</b>
      <div className="formInput">
        <label htmlFor="fullName">Your Full Name</label>
        <input
          id="fullName"
          type="text"
          placeholder="Full Name"
          value={info.fullName}
          onChange={handleChangeInfo}
        />
      </div>
      <div className="formInput">
        <label htmlFor="email">Your Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={info.email}
          onChange={handleChangeInfo}
        />
      </div>
      <div className="formInput">
        <label htmlFor="phoneNumber">Your Phone Number</label>
        <input
          id="phoneNumber"
          type="number"
          placeholder="Phone Number"
          value={info.phoneNumber}
          onChange={handleChangeInfo}
        />
      </div>
      <div
        className={`formInput ${isNotCreditCard ? 'notPickCreditCard' : ''}`}
      >
        <label htmlFor="cardNumber">Your Identity Card Number</label>
        <input
          id="cardNumber"
          type="number"
          placeholder="Card Number"
          value={info.cardNumber}
          onChange={handleChangeInfo}
        />
      </div>
    </div>
  );
};

export default ReserveInfo;
