/* eslint-disable @typescript-eslint/no-unused-vars */
import './calendar.css';
import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { Panel } from 'catamaran/core/Panel';
import { useEffect, useRef, useState } from 'react';
import DragAffordanceIcon from 'catamaran/icons/DragAffordance';
import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import LocationIcon from 'catamaran/icons/Location';
import clsx from 'clsx';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, '');
const createEventId = () => String(eventGuid++);

type eventType = 'missed' | 'open' | 'inprogress' | 'done';

// TODO LIST
// 1-) Süreklenen item az yukarı kayıyor ona bakılacak.
// 2-) Sol tarafa itemlar eklenecek. Typelar yukarda (eventType).
// 3-) Calendar'a soldan itemlar eklenecek.
// 4-) Calendar'a eklenen item tekrar listeye atılacak.

const Calendar = () => {
  const draggableEl = useRef(null);
  const [state, setState] = useState({
    calendarEvents: [
      {
        id: createEventId(),
        start: todayStr,
        title: 'Missed',
        type: 'missed'
      },
      {
        id: createEventId(),
        start: todayStr,
        title: 'Open',
        type: 'open'
      },
      {
        id: createEventId(),
        start: todayStr,
        title: 'In progress',
        type: 'inprogress'
      },
      {
        id: createEventId(),
        start: todayStr,
        title: 'Done',
        type: 'done'
      }
    ],
    externalEvents: [
      { id: 34432, title: 'Maquet Ventilator', type: 'open' },
      { id: 323232, title: 'Siemens MRI', type: 'inprogress' },
      { id: 1111, title: 'GE Patient Side...', type: 'missed' }
    ]
  });

  const renderEventContent = (eventInfo: EventContentArg) => {
    const { type } = eventInfo.event.extendedProps;
    return (
      <div
        className={clsx({
          'fc-drag-chip': true,
          [type]: true
        })}
      >
        <DragAffordanceIcon />
        <p>{eventInfo.event.title}</p>
      </div>
    );
  };

  useEffect(() => {
    const initDraggableElement = new Draggable(draggableEl.current!, {
      eventData: (eventEl) => {
        const { id, title, type } = eventEl.dataset;
        return {
          create: true,
          id,
          title,
          type
        };
      },
      itemSelector: '.fc-event'
    });
  }, []);

  const handleDataCardColor = (type: string) => {
    if (type === 'open') {
      return 'blue';
    }
    if (type === 'inprogress') {
      return 'green';
    }
    if (type === 'missed') {
      return 'red';
    }
    return 'darkGrey';
  };

  const renderPanel = () => (
    <Panel>
      <div className="grid gap-8 align-content-start" id="external-events" ref={draggableEl}>
        {state.externalEvents.map((event) => (
          <div
            className="fc-event"
            data-id={event.id}
            data-title={event.title}
            data-type={event.type}
            key={event.id}
          >
            <CatDataCard
              color={handleDataCardColor(event.type)}
              minWidth="auto"
              transparentBackground
            >
              <CatSidebar>
                <CatEmptyIcon />
                <CatCenterIcon component={LocationIcon} />
                <CatEmptyIcon />
              </CatSidebar>
              <div className="grid gap-4 p16">
                <CatTypography variant="subtitle1">{event.title}</CatTypography>
              </div>
            </CatDataCard>
          </div>
        ))}
      </div>
    </Panel>
  );

  return (
    <div className="mt24 opacity-8 radius-16 elev-1">
      <div
        className="grid grid-auto-flow-column gap-8 p8"
        style={{ backgroundColor: 'rgba(255,255,255,0.1)', gridTemplateColumns: '355px 1fr' }}
      >
        {renderPanel()}
        <FullCalendar
          dayMaxEvents
          editable
          eventContent={renderEventContent}
          events={state.calendarEvents}
          headerToolbar={{
            left: 'title',
            right: 'prev,today,next'
          }}
          plugins={[dayGridPlugin, interactionPlugin]}
          selectable
        />
      </div>
    </div>
  );
};

export default Calendar;
