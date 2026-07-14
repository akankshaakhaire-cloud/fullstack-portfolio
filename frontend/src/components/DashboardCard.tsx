type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: string;
};

const DashboardCard = ({
  title,
  value,
  icon,
}: DashboardCardProps) => {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,.98), rgba(248,247,255,.92))",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRadius: "22px",
        padding: "24px",
        border: "1px solid rgba(124,58,237,.15)",
        boxShadow:
          "0 12px 35px rgba(124,58,237,.15)",
        transition:
          "all .35s cubic-bezier(.2,.8,.2,1)",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-8px) scale(1.02)";

        e.currentTarget.style.boxShadow =
          "0 22px 45px rgba(124,58,237,.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0) scale(1)";

        e.currentTarget.style.boxShadow =
          "0 12px 35px rgba(124,58,237,.15)";
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "-45px",
          right: "-45px",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,.15), transparent 70%)",
        }}
      />

      {/* Shine */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-120%",
          width: "70%",
          height: "100%",
          transform: "skewX(-25deg)",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,.45), transparent)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "#7c3aed",
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: ".5px",
              textTransform: "uppercase",
            }}
          >
            {title}
          </p>

          <h2
            style={{
              marginTop: "12px",
              marginBottom: 0,
              color: "#1e1b4b",
              fontSize: "36px",
              fontWeight: 800,
            }}
          >
            {value}
          </h2>
        </div>

        <div
          style={{
            width: "76px",
            height: "76px",
            borderRadius: "22px",
            background:
              "linear-gradient(135deg,#7c3aed,#9333ea,#6366f1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "34px",
            color: "#fff",
            boxShadow:
              "0 15px 30px rgba(124,58,237,.35)",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;