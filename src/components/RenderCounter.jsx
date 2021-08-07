import React, { useState } from "react";
import { usePrevious } from "../hooks";

export default function RenderCounter({ id }) {
  const [renderCount, setRenderCount] = useState(1);
  const prevRenderCount = usePrevious(renderCount);

  if (prevRenderCount === renderCount) {
    // then we re-rendered due to parent
    setRenderCount((prev) => prev + 1);
  }
  return <span>{renderCount}</span>;
}
