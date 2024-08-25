// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       console.log('Please enter both email and password.');
//       return;
//     }

//     console.log('Logging in with', { email, password });

//     setEmail('');
//     setPassword('');
//     navigate('/chats');

//   };

//   return (
//     <div className="">
//       <form onSubmit={handleSubmit} className="">
//         <h2>Login</h2>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const clickHandler = () => {
      console.log(email, password);
      navigate("/chats");
    
      
    }
  return (

      <div className=" flex justify-center items-center">
        <Toaster />
        <div className=" flex flex-col gap-8 rounded-3xl border-4 border-sky-700 p-8 mt-10 text-center max-w-md">
          <h2 className="text-3xl p-2 hover:text-sky-400 rounded-2xl bg-sky-100" >Login</h2>
          <input
          className="outline-none border text-xl border-gray-300 px-2 py-4 rounded-lg"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
          className="outline-none border text-xl border-gray-300 px-2 py-4 rounded-lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          
        
          <button
            onClick={() => clickHandler()}
            className=" py-2 px-3 text-2xl border-2 hover:bg-sky-100 rounded-lg"
          >
            Login
          </button>

          <h6>
            <Link className="hover:text-sky-400" to="/resetpassword">
              Forget Password ?
            </Link>
          </h6>
        </div>
      </div>


  );
};

export default Login;


