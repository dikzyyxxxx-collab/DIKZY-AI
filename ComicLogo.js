export default function ComicLogo({ size = 64 }) {
  return (
    <div className="dikzy-logo" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bintang belakang (abu-abu, offset dikit buat efek komik/pop-art) */}
        <polygon
          points="50,6 61,38 95,38 68,58 78,90 50,70 22,90 32,58 5,38 39,38"
          fill="#d9d9d9"
          stroke="#111111"
          strokeWidth="3"
          transform="translate(5,5)"
        />
        {/* Bintang utama (putih dengan outline hitam tebal) */}
        <polygon
          points="50,6 61,38 95,38 68,58 78,90 50,70 22,90 32,58 5,38 39,38"
          fill="#ffffff"
          stroke="#111111"
          strokeWidth="4"
        />
        {/* Titik halftone kecil di dalam bintang buat tekstur komik */}
        <circle cx="42" cy="45" r="2.2" fill="#111111" />
        <circle cx="52" cy="40" r="2.2" fill="#111111" />
        <circle cx="60" cy="50" r="2.2" fill="#111111" />
        <circle cx="46" cy="58" r="2.2" fill="#111111" />
      </svg>
    </div>
  );
}
