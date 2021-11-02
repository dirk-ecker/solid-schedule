import { createEffect, For } from 'solid-js'
import { createStore } from 'solid-js/store'

const createLocalStore = () => {
  // you can only use object, array is not possible
  const [state, setState] = createStore({
    timeEntries: [
      { time: "8AM", text: '' },
      { time: "9AM", text: '' },
      { time: "10AM", text: '' },
      { time: "11AM", text: '' },
      { time: "12AM", text: '' },
      { time: "1PM", text: '' },
      { time: "2PM", text: '' },
      { time: "3PM", text: '' },
      { time: "4PM", text: '' },
      { time: "5PM", text: '' },
      { time: "6PM", text: '' },
      { time: "7PM", text: '' },
      { time: "8PM", text: '' }
    ]
  })

  // setState takes an object using the same structure as during creation
  if (localStorage.timeEntries) setState(JSON.parse(localStorage.timeEntries))

  // state is an object/proxy, no method
  createEffect(() => (localStorage.timeEntries = JSON.stringify(state)))
  return [state, setState]
}

const TimeEntry = properties => {
  return (
    <>
      <li>
        <div>{properties.entry.time}</div>
        <input
          type="text"
          value={properties.entry.text}
          placeholder="enter todo"
          oninput={event => properties.saveValue(properties.index, event.target.value)}
        />
      </li>
    </>
  )
}

const TimeEntryList = properties => {
  return (
    <ul>
      <For each={properties.timeEntries}>{(entry, index) =>
        <TimeEntry
          entry={entry}
          index={index()}
          saveValue={properties.saveValue}
        />
      }</For>
    </ul>
  )
}

export default () => {
  const [state, setState] = createLocalStore()
  const saveValue = (index, value) => setState("timeEntries", index, { text: value })

  return <TimeEntryList
    timeEntries={state.timeEntries}
    saveValue={saveValue}
  />
}
