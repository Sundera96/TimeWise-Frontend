import { formatDateTime, formatDateStr } from "./util";

export async function fetchEvent(link, token) {
  const response = await fetch(link, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export function fetchEvents(startDate, endDate, setEventsState, token) {
  fetch(`http://localhost:8080/event/${startDate}/${endDate}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setEventsState(data);
    });
}

export function addEvent(
  event,
  token,
  startDate,
  endDate,
  events,
  setEventsState
) {
  const link = "http://localhost:8080/event/";
  console.log(event);
  event = {
    ...event,
    ["selected-start-date"]: startDate,
    ["selected-end-date"]: endDate,
  };
  console.log("adding query");
  if (event["type-tag"] === "REMINDER") {
    event = {
      ...event,
      ["remind-date-time"]: formatDateTime(new Date(event["remind-date-time"])),
      ["recurrence-count"]: 1,
    };
  } else if (event["type-tag"] === "MEETING") {
    event = {
      ...event,
      ["start-date-time"]: formatDateTime(new Date(event["start-date-time"])),
      ["end-date-time"]: formatDateTime(new Date(event["end-date-time"])),
      ["recurrence-count"]: 1,
    };
  } else if (event["type-tag"] === "TASK") {
    console.log(event["task-date"]);
    event = {
      ...event,
      ["task-date"]: formatDateStr(event["task-date"]),
    };
  } else if (event["type-tag"] === "LINK") {
    event = {
      ...event,
      ["link-date-time"]: formatDateTime(new Date()),
    };
  }
  console.log(event);
  fetch(link, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      events = events.concat(data);
      setEventsState(events);
    });
}

export async function updateEvent(
  event,
  token,
  startDate,
  endDate,
  link,
  events
) {
  event = {
    ...event,
    ["selected-start-date"]: startDate,
    ["selected-end-date"]: endDate,
  };
  console.log("adding query");
  if (event["type-tag"] === "REMINDER") {
    event = {
      ...event,
      ["remind-date-time"]: formatDateTime(new Date(event["remind-date-time"])),
      ["recurrence-count"]: 1,
    };
  } else if (event["type-tag"] === "MEETING") {
    event = {
      ...event,
      ["start-date-time"]: formatDateTime(new Date(event["start-date-time"])),
      ["end-date-time"]: formatDateTime(new Date(event["end-date-time"])),
      ["recurrence-count"]: 1,
    };
  } else if (event["type-tag"] === "TASK") {
    console.log(event["task-date"]);
    event = {
      ...event,
      ["task-date"]: formatDateStr(event["task-date"]),
    };
  } else if (event["type-tag"] === "LINK") {
    event = {
      ...event,
      ["link-date-time"]: formatDateTime(new Date()),
    };
  }
  const response = await fetch(link, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let data = await response.json();
  data = data[0];
  events = events.filter((item) => {
    return item.eventId !== data.eventId;
  });
  console.log("Events Query JS befre concat");
  return events.concat(data);
  // .then((response) => {
  //   return response.json();
  // })
  // .then((data) => {
  //   // eventValues[event["type-tag"].toLowerCase()] = eventValues[
  //   //   event["type-tag"].toLowerCase()
  //   // ].filter((event) => {
  //   //   event.eventId !== data.eventId;
  //   // });
  //   // eventValues[event["type-tag"].toLowerCase()].push(data[0]);
  //   events = events.filter((item) => {
  //     item.eventId !== data.eventId;
  //   });
  //   return events.concat(data);
  // });
}
