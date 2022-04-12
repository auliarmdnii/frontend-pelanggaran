import { useState, useEffect } from 'react';
import axios from 'axios';
export default function user() {
  let [user, setUser] = useState([]);

  /** get token from local storage */
  let token = localStorage.getItem(`token-pelanggaran`);

  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // create function to get data user from backend
  let getData = () => {
    /**
     * endpoint = http://localhost:8080/user
     * method = GET
     * request = none
     * response = array data user
     * authorization = Bearer Token
     */
    let endpoint = `http://localhost:8080/user`;
    /** sending data */
    axios
      .get(endpoint, authorization)
      .then((response) => {
        // simpan di state user
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="card m-2">
        <div className="card-header" style={{ background: `blue` }}>
          <h4 className="text-white">Daftar User</h4>
        </div>

        <div className="card-body">
          <ul className="list-group">
            {user.map((item) => (
              <li className="list-group-item">
                <div className="row">
                  <div className="col-3">
                    <small className="text-info">ID User</small>
                    <h5>{item.id_user}</h5>
                  </div>
                  <div className="col-6">
                    <small className="text-info">Nama</small>
                    <h5>{item.nama}</h5>
                  </div>
                  <div className="col-3">
                    <small className="text-info">Username</small>
                    <h5>{item.username}</h5>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
