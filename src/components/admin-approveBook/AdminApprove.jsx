import React from "react";
import Table from "react-bootstrap/Table";
import "./admin_approve.scss";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AdminApprove = () => {
  const [listedBooks, setListedBooks] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const approveBook = (id, e) => {
    e.preventDefault();
    const data = {
      id: id,
    };
    axios
      .put("http://localhost:90/book/approve", data, config)
      .then((response) => {
        console.log(response.data.msg);
        toast.success(
          "Approved Successfully",
          { toastId: "Approve success" },
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const rejectBook = (id, e) => {
    e.preventDefault();
    const data = {
      id: id,
    };
    axios
      .put("http://localhost:90/book/reject", data, config)
      .then((response) => {
        console.log(response.data.msg);
        toast.success(
          "Rejected Successfully",
          { toastId: "Reject success" },
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:90/book/getallbyadmin", config).then((res) => {
      console.log(res.data);
      setListedBooks(res.data.data);
      console.log(listedBooks);
    });
  }, []);
  return (
    <div data-test="approve_book">
      <h1 className="table-title">Verify Books</h1>
      <div className="table-responsive">
        <Table className="table" id="heading" striped>
          <thead>
            <tr>
              <th>Book Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>Category</th>
              <th>Rent</th>
              <th>Book Owner</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listedBooks.map((book) => (
              <tr key={book._id}>
                <td className="w-25">
                  <img
                    src={`http://localhost:90/${book.book_pic}`}
                    className="img-fluid img-thumbnail table-img"
                    alt="Sheep"
                  />
                </td>
                <td>{book.name}</td>
                <td>{book.desc}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.rent_cost_perday}</td>
                <td>{book.bookOwner.username}</td>
                <td
                  className={`${
                    (book.status === "Pending" && "text-warning") ||
                    (book.status === "Approved" && "text-success") ||
                    (book.status === "Rejected" && "text-danger")
                  }`}
                >
                  {book.status}
                </td>
                <td>
                  {/* {book.status === "Pending" ? (
                    <>
                      <button
                        className="reject--btn"
                        onClick={(e) => {
                          rejectBook(book._id, e);
                        }}
                        data-test="approve--btn"
                      >
                        Reject &nbsp; <ImCross />
                      </button>
                      <button
                        type="submit"
                        className="approve--btn"
                        onClick={(e) => {
                          approveBook(book._id, e);
                        }}
                        data-test="approve--btn"
                      >
                        Approve &nbsp; <BsFillCheckCircleFill />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="reject--btn">
                        Deletes &nbsp; <ImCross />
                      </button>
                    </>
                  )} */}
                  <button
                    type="submit"
                    className="approve--btn"
                    onClick={(e) => {
                      approveBook(book._id, e);
                    }}
                    data-test="approve--btn"
                  >
                    Approve &nbsp; <BsFillCheckCircleFill />
                  </button>
                  <button
                    className="reject--btn"
                    onClick={(e) => {
                      rejectBook(book._id, e);
                    }}
                    data-test="reject--btn"
                  >
                    Reject &nbsp; <ImCross />
                  </button>
                </td>
              </tr>
            ))}

            {/* <tr>
              <td>2</td>
              <td class="w-25">
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_.jpg"
                  class="img-fluid img-thumbnail table-img"
                  alt="Sheep"
                />
              </td>
              <td>Harry Portter</td>
              <td>This is the book of...</td>
              <td>Jk Rolling</td>
              <td>Fantacy</td>
              <td>Rs. 50</td>
              <td>Hari</td>
              <td className="pending-color">Pending</td>
              <td>
                <button class="approve--btn">
                  Approve &nbsp; <BsFillCheckCircleFill />
                </button>
                <button class="reject--btn ">
                  Reject &nbsp; <ImCross />
                </button>
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td class="w-25">
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_.jpg"
                  class="img-fluid img-thumbnail table-img"
                  alt="Sheep"
                />
              </td>
              <td>Harry Portter</td>
              <td>This is the book of...</td>
              <td>Jk Rolling</td>
              <td>Fantacy</td>
              <td>Rs. 50</td>
              <td>Hari</td>
              <td className="pending-color">Pending</td>
              <td>
                <button class="approve--btn">
                  Approve &nbsp; <BsFillCheckCircleFill />
                </button>
                <button class="reject--btn ">
                  Reject &nbsp; <ImCross />
                </button>
              </td>
            </tr> */}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminApprove;
