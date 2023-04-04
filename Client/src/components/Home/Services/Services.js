import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faHiking,
  faHandHoldingDollar,
  faHotel,
  faWallet,
  faHeadset,
} from '@fortawesome/free-solid-svg-icons';

import './services.css';

const Services = () => {
  return (
    <div className="home-services">
      {/* <h3 className="home-page__title mb-4">Why choose us</h3> */}

      <div className="row ">
        <div className="col-sm-6 col-md-4">
          <div className="why-item">
            <FontAwesomeIcon icon={faGlobe} className="icon--why mb-3" />
            <h5 className="mb-3 why-item__title">Mạng bán tour</h5>
            <p className="card-text">Ứng dụng công nghệ mới nhất</p>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="why-item">
            <FontAwesomeIcon icon={faHiking} className="icon--why mb-3" />
            <i className="icon icon--why-4 mb-3"></i>
            <h5 className="mb-3 why-item__title">Sản phẩm &amp; Dịch vụ</h5>
            <p className="mb-1">Đa dạng – Chất lượng – An toàn</p>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="why-item">
            <FontAwesomeIcon
              icon={faHandHoldingDollar}
              className="icon--why mb-3"
            />
            <i className="icon icon--why-3 mb-3"></i>
            <h5 className="mb-3 why-item__title">Giá cả</h5>
            <p className="mb-1">Luôn có mức giá tốt nhất</p>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="why-item">
            <FontAwesomeIcon icon={faHotel} className="icon--why mb-3" />
            <i className="icon icon--why-7 mb-3"></i>
            <h5 className="mb-3 why-item__title">Khách sạn</h5>
            <p className="mb-1">Dễ dàng &amp; nhanh chóng chỉ với 3 bước</p>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="why-item">
            <FontAwesomeIcon icon={faWallet} className="icon--why mb-3" />
            <i className="icon icon--why-2 mb-3"></i>
            <h5 className="mb-3 why-item__title">Thanh toán</h5>
            <p className="mb-1">An toàn &amp; linh hoạt</p>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="why-item">
            <FontAwesomeIcon icon={faHeadset} className="icon--why mb-3" />
            <i className="icon icon--why-6 mb-3"></i>
            <h5 className="mb-3 why-item__title">Hỗ trợ</h5>
            <p className="mb-1">Hotline &amp; trực tuyến (09h00 - 21h00)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
