import React, { useMemo } from "react";
import { format } from "date-fns";
import { Container, TopCard, BottomCard } from "./styles";

import typeIcons from "../../utils/typeIcons";

function TaskCard({ type, title, when, done }) {
  const date = useMemo(() => format(new Date(when), "dd/MM/yyyy"), [when]);
  const hour = useMemo(() => format(new Date(when), "HH:mm"), [when]);

  return (
    <Container done={done}>
      <TopCard>
        {done ? (
          <img src={typeIcons[10]} alt="Icone da Tarefa" />
        ) : (
          <img src={typeIcons[type]} alt="Icone da Tarefa" />
        )}

        <h3>{title}</h3>
      </TopCard>

      <BottomCard>
        <strong>{date}</strong>
        <span>{hour}</span>
      </BottomCard>
    </Container>
  );
}

export default TaskCard;
