import { VscExpandAll } from "react-icons/vsc";
import { MdOutlineWork } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaMasksTheater } from "react-icons/fa6";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import "./index.css";
import AllTodoDetails from "../Context/AllTodoDetails";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";

const Categories = [
  { id: 0, title: "All" },
  { id: 1, title: "Work" },
  { id: 2, title: "Study" },
  { id: 3, title: "Entertainment" },
  { id: 4, title: "Family" },
];

const Sidebar = (props) => {
  const getReleatedIcons = (category) => {
    switch (category) {
      case "All":
        return <VscExpandAll className="icon-of-tab" />;
        break;
      case "Work":
        return <MdOutlineWork className="icon-of-tab" />;
        break;
      case "Study":
        return <PiStudentBold className="icon-of-tab" />;
        break;
      case "Entertainment":
        return <FaMasksTheater className="icon-of-tab" />;
        break;
      default:
        return <MdOutlineFamilyRestroom className="icon-of-tab" />;
        break;
    }
  };

  const clickLogOutBtn = () => {
    const { history } = props;
    Cookies.remove("user_id");
    history.replace("/login");
  };

  return (
    <AllTodoDetails.Consumer>
      {(value) => {
        const { changeCantegory, hideTaskBtn, category, LogoutBtn } = value;
        return (
          <div className="side-bar">
            <ul className="ul-of-tabs">
              {Categories.map((eachValue) => (
                <li
                  className={`list-of-tabs ${
                    category === eachValue.title && "active-tab"
                  }`}
                  key={eachValue.id}
                  onClick={() => changeCantegory(eachValue.title)}
                >
                  {getReleatedIcons(eachValue.title)}
                  <p className="title-of-tab">{eachValue.title}</p>
                </li>
              ))}
            </ul>
            <div className="container-of-checkbox">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onChange={() => hideTaskBtn()}
              />
              <label className="label-of-checkbox" htmlFor="checkbox">
                Hide Done Tasks
              </label>
            </div>
            <button
              className="logout-btn"
              onClick={() => {
                LogoutBtn();
                clickLogOutBtn();
              }}
            >
              Logout
              <LuLogOut className="logout-icon" />
            </button>
          </div>
        );
      }}
    </AllTodoDetails.Consumer>
  );
};

export default withRouter(Sidebar);
