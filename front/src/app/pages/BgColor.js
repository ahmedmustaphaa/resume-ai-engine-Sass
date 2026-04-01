function BgColor({top, bottom, left, right}) {
  return (
    <div 
      className="absolute -z-10 rounded-full blur-[150px]"
      style={{
        top: top, 
        bottom: bottom, 
        left: left, 
        right: right,
        width: "900px",
        height: "700px",
        background: "rgba(188, 255, 154, 0.8)", // دي قوة اللون (0.8 يعني 80% شفافية)
        transform: "translateX(-50%)"
      }}
    ></div>
  )
}

export default BgColor