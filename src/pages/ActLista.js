const ActLista = (props) => {
    const act = props.acts;
    const titulo = props.title;

    return (
        <div className="act-lista">
            <h2>{titulo}</h2>
            {act.map((act)=> (
          <div className="act-preview" key={act.id}>
            <h2>{act.title}</h2>
            <p>Creada por {act.author}</p>
            <button className="btn btn-danger">Eliminar Actividad</button>
          </div>
            ))}
        </div>
    );
}
 
export default ActLista;
