import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import gsap from "gsap";
import { Box } from "@mui/material";

const Circle = forwardRef(({ size, delay }, ref) => {
  const el = useRef();
  useImperativeHandle(
    ref,
    () => {
      // return our API
      return {
        moveTo(x, y) {
          gsap.to(el.current, { x, y, delay });
        },
      };
    },
    [delay]
  );
  return (
    <div
      className={`circle ${size}`}
      style={{
        background: "linear-gradient(135deg, orange 50%, cyan)",
        borderRadius: "100%",
        position: "fixed",
        transform: "translate(-50%, -50%)",
        top: 0,
        left: 0,
        opacity: 0.3,
      }}
      ref={el}
    ></div>
  );
});

export default function CursorMovement() {
  //GSAP
  let innerWidth = 100;
  let innerHeight = 100;
  const circleRefs = useRef([]);
  // reset on re-renders
  circleRefs.current = [];

  useEffect(() => {
    circleRefs.current.forEach((ref) =>
      ref.moveTo(innerWidth / 2, innerHeight / 2)
    );
    const onMove = ({ clientX, clientY }) => {
      circleRefs.current.forEach((ref) => ref.moveTo(clientX, clientY));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [innerHeight, innerWidth]);
  const addCircleRef = (ref) => {
    if (ref) {
      circleRefs.current.push(ref);
    }
  };
  return (
    <div>
      <Box className="panel center" position="fixed" width="100%" height="100%">
        <Circle size="sm" ref={addCircleRef} delay={0} />
        <Circle size="md" ref={addCircleRef} delay={0.1} />
        <Circle size="lg" ref={addCircleRef} delay={0.2} />
      </Box>
    </div>
  );
}
