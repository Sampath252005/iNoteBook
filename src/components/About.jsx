
import react,{useContext, useEffect} from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a=useContext(noteContext)
  useEffect(()=>{
    a.update()
  },[]);
  return (
<>
<div> 
  This about {a.state.name} and he is class {a.state.class}
</div>
</>
  )
}

export default About
