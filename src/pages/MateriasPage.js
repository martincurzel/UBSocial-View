import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { callApiRead } from '../helpers/apiCallRead';



const MateriasPage = () => {
  const [materias, setMaterias] = useState([]);
  const [filtredData, setFiltredData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      await callApiRead("Subject")
        .then(response => {
          setMaterias(response.data)
          setFiltredData(response.data)
          console.log(response)
        })
        .catch(error => {
          // Handle any errors from the API
          console.error('Error:', error);
        });
    }

    document.getElementById('searchInput').focus();
    fetchData();
  }, []);

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = materias.filter(materias =>
      materias.name.toLowerCase().includes(searchTerm)
    );
    setFiltredData(filtered);
  };

  return (
    <div>
      <main className="container ">

        <div className='row justify-content-center'>
          <input type="text" id="searchInput" placeholder="Buscar Materia" className="form-control mt-4 w-50" onChange={handleFilter} />
        </div>

        <div className='row justify-content-center'>

          <div className='col-md-6'>
            <table className="table mt-5 table-hover w-100">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filtredData.map((item) => (
                  <tr key={item.id}>
                    <td className="col-md-6 ">{item.name}</td>
                    <td className='text-end'>
                      <Link to={"/contenidos/" + item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button variant="outlined" color="secondary">Archivos</Button>
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </main>

    </div>
  )
};

export default MateriasPage;