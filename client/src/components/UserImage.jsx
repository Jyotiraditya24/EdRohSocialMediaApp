const UserImage = ({ image, size = "60px" }) => {
    return (
      <div width={size} height={size}>
        <img
          className={`object-cover rounded-full w-[${size}] height-[${size}]`}
          alt="profilepicture"
          src={`http://localhost:3001/assets/${image}`}
        ></img>
      </div>
    );
};
export default UserImage;
