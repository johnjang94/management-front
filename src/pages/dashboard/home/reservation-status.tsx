export default function ReservationStatus() {
  return (
    <div className="md:grid md:grid-cols-2 md:gap-6 text-center space-y-5 md:space-y-0">
      <div className="bg-secondary-tan-alt rounded-2xl space-y-14 p-5">
        <h5 className="text-2xl text-center">Incoming Reservation</h5>
        <h2 className="text-5xl">7</h2>
      </div>
      <div className="bg-secondary-tan-alt rounded-2xl space-y-14 p-5">
        <h5 className="text-2xl text-center">Cancellation</h5>
        <h2 className="text-5xl">0</h2>
      </div>
      <div className="bg-secondary-tan-alt rounded-2xl space-y-14 p-5">
        <h5 className="text-2xl text-center">No show</h5>
        <h2 className="text-5xl">1</h2>
      </div>
      <div className="bg-secondary-tan-alt rounded-2xl space-y-14 p-5">
        <h5 className="text-2xl text-center">Stay over</h5>
        <h2 className="text-5xl">0</h2>
      </div>
    </div>
  );
}
