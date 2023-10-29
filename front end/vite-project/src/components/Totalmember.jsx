import "./member.css"
function totalmember({name,imageurl}){
    
    return(
        <>
        <div className="roll">
            <div className="icon">
        <img src={imageurl} id="userpic"/>   
        </div>
        
        <p>{name}</p>
        <div > </div>
        </div>
        
        
        </>
        
        
        
        )

    
    
    }
    export default totalmember