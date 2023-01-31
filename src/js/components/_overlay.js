import { timerID } from "../main";
import _vars from "./../_vars";

_vars.resetButton.onclick = () => {
  window.location.reload();
};
_vars.stopButton.onclick = () => {
  clearInterval(timerID);
};
