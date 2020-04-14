import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from './src/Components/Button';
import Display from './src/Components/Display';



export default function App() {
  const [display, setDisplay] = useState('0');
  const [clearDisplay, setClearDiplay] = useState(false);
  const [oper, setOperation] = useState('');
  const [current, setCurrent] = useState(0);
  const [values, setValues] = useState([10, 15]);

  
  function addDigit(n) {


    const clearDisplayN = display == '0' || clearDisplay

    if (n === '.' && !clearDisplayN && display.includes('.')) {
      return
    }
    const currentValue = clearDisplayN ? '' : display
    const resulCurrent = currentValue + n
    setDisplay(resulCurrent)
    setClearDiplay(false)

    if (n != '.') {
      const valores = [...values];
      valores[current] = parseFloat(resulCurrent);
      setValues(valores);
    }
  }

  function clearMemoria() {
    setDisplay(0);
    setClearDiplay(false);
    setOperation('');
    setCurrent(0);
    setValues([]);
  }

  function operations(operation) {
    if (current == 0) {
      setOperation(operation)
      setCurrent(1)
      setClearDiplay(true)

    } else {
      const equals = operation === '='
      const valores2 = [...values]
      try {
        valores2[0] = eval(`${valores2[0]} ${oper} ${valores2[1]}`)
      } catch (e) {
        valores2[0] = values[0]
      }
      valores2[1] = 0

      setDisplay(`${valores2[0]}`)
      setOperation(equals ? null : operation)
      setCurrent(equals ? 0 : 1)
      setClearDiplay(!equals)
      setValues(valores2)
    }
  }


  return (
    <View style={styles.container}>
      <Display value={display}></Display>
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemoria}></Button>
        <Button label="/" operation onClick={operations}></Button>
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit}></Button>
        <Button label="9" onClick={addDigit}></Button>
        <Button label="*" operation onClick={operations}></Button>
        <Button label="4" onClick={addDigit}></Button>
        <Button label="5" onClick={addDigit}></Button>
        <Button label="6" onClick={addDigit}></Button>
        <Button label="-" operation onClick={operations}></Button>
        <Button label="1" onClick={addDigit}></Button>
        <Button label="2" onClick={addDigit}></Button>
        <Button label="3" onClick={addDigit}></Button>
        <Button label="+" operation onClick={operations}></Button>
        <Button label="0" double onClick={addDigit}></Button>
        <Button label="." onClick={addDigit}></Button>
        <Button label="=" operation onClick={operations}></Button>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
