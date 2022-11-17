import React from "react";
import Table from "react-bootstrap/Table";
import "./admin_approve.scss";

const AdminApprove = () => {
  return (
    <div>
      <Table responsive="sm" id="heading" striped>
        <thead>
          <caption id="title">Verified Books</caption>
          <tr>
            <th>SN.</th>
            <th>Book Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Author</th>
            <th>Category</th>
            <th>Rent</th>
            <th>Book Owner</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td class="w-25">
              <img
                src="https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_.jpg"
                class="img-fluid img-thumbnail"
                alt="Sheep"
              />
            </td>
            <td>Harry Portter</td>
            <td>This is the book of...</td>
            <td>Jk Rolling</td>
            <td>Fantacy</td>
            <td>Rs. 50</td>
            <td>Hari</td>
            <td>
              <button class="approve--btn">Approved</button>
              <button class="reject--btn ">Reject</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Mark</td>
            <td>Harry Portter</td>
            <td>This is the book of...</td>
            <td>Jk Rolling</td>
            <td>Fantacy</td>
            <td>Rs. 50</td>
            <td>Hari</td>
            <td>
              <button>Approved</button>
              <button>Approved</button>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Mark</td>
            <td>Harry Portter</td>
            <td>This is the book of...</td>
            <td>Jk Rolling</td>
            <td>Fantacy</td>
            <td>Rs. 50</td>
            <td>Hari</td>
            <td>
              <button>Approved</button>
              <button>Approved</button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default AdminApprove;
