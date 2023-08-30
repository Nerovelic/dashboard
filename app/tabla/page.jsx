

export default function About() {

    return(
        <div className="bg-primary h-screen w-screen">
            <h1 className="Text-center">Tabla</h1>
            <form className="flex flex-grow">
                <label> Componente </label>
                <label> % </label>
                <label> kg</label>
                <div className="grid gap-5 mt-10">
                <label>Masa Grasa</label>
                <label>Masa Osea</label>
                <label>Masa Residual</label>
                <label>Masa Muscular</label>
                </div>
            </form>
            
        </div>
    )
}