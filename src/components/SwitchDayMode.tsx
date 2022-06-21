import { useRef } from "react";

const SwitchDayMode = () => {
  const switchButton = useRef<HTMLDivElement>(null);

  const onChangeColorTheme = () => {
    if (switchButton.current) {
      switchButton.current.classList.toggle("on");
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme:dark)");
      if (prefersDarkScheme.matches) {
        document.body.classList.toggle("light");
      } else {
        document.body.classList.toggle("dark");
      }
    }
  };

  return (
    <>
      <div ref={switchButton} onClick={onChangeColorTheme} className={"switch"}></div>
    </>
  );
};

export default SwitchDayMode;
