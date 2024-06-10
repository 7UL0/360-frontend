'use client'
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import { Typography, Rating, Box, Button, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ankieta360 } from '../form360';
import { Papierek } from '../wrapper';
import ResponsiveAppBar from '../../components/NavbarComponent';

type UserData = {
  odpowiedz1: number
  odpowiedz2: number
  odpowiedz3: string
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

const BootstrapButton = styled(Button)({
  color: "white",
  '&:hover': {
    backgroundColor: '#fcc404',
    borderColor: '#fcc404',
    boxShadow: 'none',
  },
})

export function Formulando1({ odpowiedz1, updateFields }: UserFormProps) {
  return (
    <Papierek title="Pytanie 1">
      <label>Jak Ci się pracuje z ocenianym pracownikiem?</label>
      <br/><br/><br/>
      <Rating
        autoFocus
        name="Odpowiedź 1"
        value={odpowiedz1}
        onChange={(e, value) => updateFields({ odpowiedz1: value })}
        defaultValue={1}
        max={6}
        size="large"
      />
    </Papierek>
  )
}

export function Formulando2({ odpowiedz2, updateFields }: UserFormProps) {
  return (
    <Papierek title="Pytanie 2">
      <label>Jak oceniasz efekty pracy pracownika (jakość kodu w przypadku programisty/ jakość dokumentacji w przypadku analityka/ jakość testów w przypadku testerów)? </label>
      <br/><br/><br/>
      <Rating
        autoFocus
        name="Odpowiedź 2"
        value={odpowiedz2}
        onChange={(e, value) => updateFields({ odpowiedz2: value })}
        defaultValue={1}
        max={6}
        size="large"
      />
    </Papierek>
  )
}

export function Formulando3({ odpowiedz3, updateFields }: UserFormProps) {
  return (
    <Papierek title="Pytanie 3">
      <label>Jak oceniasz ocenianego pracownika na tle zespołu?</label>
      <br/><br/><br/>
      <input autoFocus required type="text" value={odpowiedz3} onChange={e => updateFields({ odpowiedz3: e.target.value })} 
      /><br></br>
    </Papierek>
  )
}

type FormData = {
  odpowiedz1: number
  odpowiedz2: number
  odpowiedz3: string
}

const INITIAL_DATA: FormData = {
  odpowiedz1: 1,
  odpowiedz2: 1,
  odpowiedz3: "",
} // types.ts

function Form() {
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepindex, step, czyPierwszy, czyOstatni, wstecz, dalej } = ankieta360([
    <Formulando1 {...data} updateFields={updateFields} />,
  ]); //too much logic here

  const router = useRouter()

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!czyOstatni) return dalej();

    try {
      const response = await fetch('/api/saveData', { // use axios
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Zapisano twoje odpowiedzi.');
        router.push("/")
      } else {
        alert('Wystąpił błąd, spróbuj ponownie później.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Wystąpił błąd, spróbuj ponownie później.');
    }
  }
  

  return <>
  <ResponsiveAppBar/>
  <div style={{
    position: "relative",
    background: "white",
    border: "2px solid black",
    padding: "2rem",
    borderColor: "#fcc404",
    fontFamily: "Arial",
    height: "440px"
  }}>
    <form onSubmit={onSubmit}>
      <div style={{
        marginTop: "1rem",
        position: "absolute",
        top: ".5rem",
        right: "26px", // pixele ssą
        fontWeight: 550,
        fontSize: 16, 
      }}>
        {currentStepindex + 1} / {steps.length}
      </div>
      {step}
      <div style={{
        display: "flex",
        gap: ".5rem",
        justifyContent: "flex-end", // polskie nazwy
      }}>
        {!czyPierwszy && <BootstrapButton size="small" variant="contained" type="button" onClick={wstecz} sx={{ bgcolor: "black" }}>Wstecz</BootstrapButton>}
        <BootstrapButton size="small" variant="contained" type="submit" sx={{ bgcolor: "black" }}>
          {czyPierwszy ? "Prześlij odpowiedzi" : "Dalej"} 
        </BootstrapButton>
      </div>
    </form>
  </div></>
}

export default Form

/* interface Pytanie {
  idPytania: number;
  trescPytania: string;
  opisPytania: string;
  typPytania: string;
}

const LoggedPage = () => {
  const [questions, setQuestions] = useState<Pytanie[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const [userId, setUserId] = useState<number | null>(null);
  const [sessionActive, setSessionActive] = useState<boolean | null>(null);
  const [values, setValues] = useState<{ [key: number]: number | null }>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/pytania.json');
        const data = await response.json();
        setQuestions(data);
        
      } catch (error) {
        console.error('Błąd', error);
      }
    };

    fetchQuestions();
  }, []);

  const czyGwiazdka = (question: Pytanie) => {
    return question.typPytania === "Gwiazda";
  };

  const czyNieGwiazdka = (question: Pytanie) => {
    return question.typPytania !== "Gwiazda";
  };

  const ocena = (id: number) => (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setValues(prevState => ({
      ...prevState,
      [id]: newValue
    }));
  };

  return (
    <div>
      <h1>Zalogowano papaję</h1>
      <p>Papaja ma id: {id}</p>
      <p>Papaja ma id: {userId}</p>
      <p>Session active: {sessionActive ? 'Yes' : 'No'}</p>
        {questions.map(question => (
          <div key={question.idPytania}>
            <h3>{question.trescPytania}</h3>
            <p>{question.opisPytania}</p>
            {czyGwiazdka(question) && (
            <div>
              <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    ></Box>
              <Typography component="legend"></Typography>
              <Rating
                name={`rating-${question.idPytania}`}
                value={values[question.idPytania]}
                onChange={ocena(question.idPytania)
                }
                max={6}
                defaultValue={0}
              />
            </div>
          )}
          </div>
        ))}
    </div>
  );
}; */

// export default LoggedPage;
