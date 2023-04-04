import './copyright.css';

const Copyright = () => {
  return (
    <div className="container-fluid copyright py-3">
      <div className="container">
        {/* <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            &copy;{' '}
            <a
              className="border-bottom"
              href="https://www.facebook.com/profile.php?id=100085923745569"
              target="_blank"
              rel="noReferrer"
            >
              Banoididulichthoii
            </a>
            , All Right Reserved.
          </div>
          <div className="col-md-6 text-center text-md-end">
            Designed By{' '}
            <a
              className="border-bottom"
              href="https://www.facebook.com/longpt27"
              target="_blank"
              rel="noReferrer"
            >
              Long Pham
            </a>
            Distributed By <Link to="https://themewagon.com">ThemeWagon</Link>
          </div>
        </div> */}
        <div className="text-center">
          &copy;{' '}
          <a
            className="border-bottom"
            href="https://www.facebook.com/profile.php?id=100085923745569"
            target="_blank"
            rel="noReferrer"
          >
            Banoididulichthoii
          </a>
          , All Right Reserved.
        </div>
      </div>
    </div>
  );
};

export default Copyright;
