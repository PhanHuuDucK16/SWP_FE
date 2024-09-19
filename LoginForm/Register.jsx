import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Register.css'

// Định nghĩa biểu thức chính quy đúng
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  // Khai báo các state
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  // Focus vào input username khi load trang
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Kiểm tra tính hợp lệ của username
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  // Kiểm tra tính hợp lệ của password và password xác nhận
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // Xóa thông báo lỗi khi người dùng thay đổi input
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <form>
        <table>
          <tbody>
          <h1>Register</h1>
            <tr>
              <td colSpan="2">
                <label htmlFor="username">
                  Username:
                  <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="useridnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p id="useridnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.<br />
                  Must begin with a letter.<br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <label htmlFor="password">
                  Password:
                  <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p id="pwdnote" className={userFocus && !validPwd ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.<br />
                  Must include uppercase and lowercase letters, a number, and a special character.<br />
                  Allowed special characters: !@#$%
                </p>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p id="confirmnote" className={userFocus && !validMatch ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </section>
  );
};

export default Register;
