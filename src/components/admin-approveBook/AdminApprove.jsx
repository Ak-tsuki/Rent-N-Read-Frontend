import React from "react";
import Table from "react-bootstrap/Table";
import "./admin_approve.scss";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";

const AdminApprove = () => {
  return (
    <div>
      <h1 class="table-title">Verify Books</h1>
      <div className="table-responsive">
        <Table className="table" id="heading" striped>
          <thead>
            <tr>
              <th>SN.</th>
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
            <tr>
              <td>1</td>
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
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminApprove;
