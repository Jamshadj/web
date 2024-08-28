import React from "react";
import "./UserHome.css";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../axios"; 
import { useDispatch, useSelector } from "react-redux";

function UserHome() {
  const imgURL = "http://localhost:4000/upload_img/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch({ type: "refresh" });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="login">
        <div className="login_box">
          <div className="left">
            <div className="top_link">
              {" "}
              <Link onClick={handleLogout}>
                {" "}
                <img
                  src="https://imgs.search.brave.com/zMQs9Xip2n7gAdeIhC_il6_iu1crRLJfkEAZ487yPz4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3Lzk3LzE4LzQ3/LzM2MF9GXzc5NzE4/NDc0NF9WSzdPcG1H/RklMOE1jQmhMeVlU/eFVUR0diWnJEUzZC/VS5qcGc"
                  alt="img"
                />
                LogOut
              </Link>
            </div>
            <div className="contact">
              <img
                src={`${
                  user.details.image !== undefined
                    ? imgURL + user.details.image.filename
                    : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360"
                }`}
                style={{ objectFit: "cover" }}
                alt=""
                width="100"
                className="rounded-circle"
              />
              <h3>{user.details.name}</h3>
              <button>
                <Link
                  to={"/editProfile"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Edit Profile Picture
                </Link>
              </button>
            </div>
          </div>
          <div className="right">
            <div className="right-text">
              <h1>WELCOME HOME</h1>
            </div>
            <div className="right-inductor">
              <img
                src="https://lh3.googleusercontent.com/fife/ABSRlIoGiXn2r0SBm7bjFHea6iCUOyY0N2SrvhNUT-orJfyGNRSMO2vfqar3R-xs5Z4xbeqYwrEMq2FXKGXm-l_H6QAlwCBk9uceKBfG-FjacfftM0WM_aoUC_oxRSXXYspQE3tCMHGvMBlb2K1NAdU6qWv3VAQAPdCo8VwTgdnyWv08CmeZ8hX_6Ty8FzetXYKnfXb0CTEFQOVF4p3R58LksVUd73FU6564OsrJt918LPEwqIPAPQ4dMgiH73sgLXnDndUDCdLSDHMSirr4uUaqbiWQq-X1SNdkh-3jzjhW4keeNt1TgQHSrzW3maYO3ryueQzYoMEhts8MP8HH5gs2NkCar9cr_guunglU7Zqaede4cLFhsCZWBLVHY4cKHgk8SzfH_0Rn3St2AQen9MaiT38L5QXsaq6zFMuGiT8M2Md50eS0JdRTdlWLJApbgAUqI3zltUXce-MaCrDtp_UiI6x3IR4fEZiCo0XDyoAesFjXZg9cIuSsLTiKkSAGzzledJU3crgSHjAIycQN2PH2_dBIa3ibAJLphqq6zLh0qiQn_dHh83ru2y7MgxRU85ithgjdIk3PgplREbW9_PLv5j9juYc1WXFNW9ML80UlTaC9D2rP3i80zESJJY56faKsA5GVCIFiUtc3EewSM_C0bkJSMiobIWiXFz7pMcadgZlweUdjBcjvaepHBe8wou0ZtDM9TKom0hs_nx_AKy0dnXGNWI1qftTjAg=w1920-h979-ft"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserHome;
