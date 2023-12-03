function RevealComponent() {
  useEffect(() => {
    function reveal() {
      const reveals = document.querySelectorAll(".reveal");

      for (const reveal of reveals) {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add("active");
        } else {
          reveal.classList.remove("active");
        }
      }
    }

    window.addEventListener("scroll", reveal);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", reveal);
    };
  }, []); // Empty dependency array means this effect runs once after mounting

  return (
    <div>
      <div className="reveal">Content to be revealed</div>
    </div>
  );
}

export default RevealComponent;

function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
