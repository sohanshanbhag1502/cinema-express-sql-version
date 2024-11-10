import Link from "next/link"
import LaunchIcon from '@mui/icons-material/Launch';

export default function About(){
    return (
        <div className="w-full flex flex-col items-center content-center justify-center
        p-10">
            <h1 className="text-4xl font-bold">About Us</h1>
            <p className="w-full text-lg text-center p-5 font-medium">
            At Cinema Express, we bring the magic of the movies right to your fingertips. 
            As a leading online movie ticket booking platform, we are dedicated to 
            delivering a smooth and convenient booking experience for every movie lover. 
            Our mission is simple: to make the excitement of cinema easily accessible to 
            everyone, whether you&apos;re planning a fun night out with friends, a cozy date, 
            or a family movie outing. Founded with a passion for entertainment, Cinema 
            Express connects you to a vast selection of the latest releases, indie films,
            and timeless classics, all from the comfort of your home or on the go. With 
            our intuitive interface, users can browse through movie listings, view 
            trailers, read reviews, and easily select showtimes at their preferred 
            theaters. We partner with theaters across the country, ensuring that you have 
            access to a wide variety of options no matter where you are. Our platform 
            prioritizes ease of use and security. Booking tickets has never been easier—
            whether on your desktop or mobile, Cinema Express provides a seamless and 
            secure payment system that protects your data, giving you peace of mind. 
            Plus, with our exclusive offers and discounts, you can enjoy your movie 
            experience at a great value. We also understand the importance of keeping 
            our users informed. Our real-time updates ensure you are always in the know 
            about upcoming releases, sold-out shows, or special screenings. Cinema 
            Express is more than just a booking service—it&apos;s your guide to the world of 
            cinema. At the heart of Cinema Express is our commitment to customer 
            satisfaction. Whether you&apos;re looking to book tickets for the latest 
            blockbuster, discover hidden gems in the indie scene, or relive the 
            nostalgia of classic films, we are here to make sure your movie-going 
            experience is as exciting and stress-free as possible. Join us at Cinema 
            Express and let us take care of the details, so you can focus on what truly 
            matters—the joy and excitement of watching movies.
            </p>
            <p className="w-full text-lg p-5 font-medium">
                <span className="w-full text-2xl font-bold">
                    Website Built By:
                </span>
                <br />
                <br />
                Sohan Shanbhag<br />
                <Link className="text-blue-700 hover:underline cursor-pointer" 
                target="_blank" href="https://www.github.com/sohanshanbhag1502">
                    Github Link
                    <LaunchIcon />
                </Link>
                <br />
                <br />
                Shrujan V<br />
                <Link className="text-blue-700 hover:underline cursor-pointer" 
                target="_blank" href="https://www.github.com/shrujan-v">
                    Github Link
                    <LaunchIcon />
                </Link>
            </p>
            <Link className="text-blue-700 hover:underline cursor-pointer pl-5 w-full 
            text-2xl font-bold" 
            target="_blank" href="https://www.github.com/sohanshanbhag1502/cinema-express">
                Website Source Code
                <LaunchIcon />
            </Link>
        </div>
    )
}