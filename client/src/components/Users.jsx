import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  async function getUsers() {
    const res = await axios.get(
      `http://localhost:8080/api/v1/user/getFilterUser?filter=${filter}`
    );
    setUsers(res.data.user);
  }
  useEffect(() => {
    getUsers();
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.username[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>{user.username}</div>
        </div>
      </div>
      <div className="pt-4">
        <button
          type="button"
          onClick={(e) => {
            navigate(`/sendMoney/?id=${user._id}&name=${user.username}`);
          }}
          class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Send Money
        </button>
      </div>
    </div>
  );
}
