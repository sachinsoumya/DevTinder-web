const UserCard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, gender, age, photoUrl, about } = user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="ProfileImage" />
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">{`${firstName} ${lastName} ${age}`}</h2>
            <div className="badge badge-accent">{gender}</div>
          </div>

          <p>{about}</p>
          <div className="card-actions flex justify-center">
            <button className="btn btn-primary">Interested</button>
            <button className="btn btn-error">Rejected</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
