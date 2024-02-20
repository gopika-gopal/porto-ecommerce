import { useState,useEffect } from 'react';
import validator from 'validator';
import { Link } from "react-router-dom";
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { gapi } from 'gapi-script';
import axios from 'axios'

// Login with Google
// const clientId = '578372850823-g2isd20gc5apj8reb3kaem7rdptsjt3q.apps.googleusercontent.com';
const clientId = '578372850823-0616357726rqqk571vj4af6lr38pjuan.apps.googleusercontent.com';
const clientSecret = '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';

const Login = () => {
   
   // used when google login oAuth was not working - source: stackoverflow
    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId:clientId,
            scope: 'email',
          });
        }
        gapi.load('client:auth2', start);
    }, []);
  //


    const onSuccess = (res) => {
        console.log('Login success', res);
        if (res && res.profileObj) {
            //window.location.href = '/forgot-password';
            localStorage.setItem('token', res.tokenId);
            window.location.href = '/home';
        }
    }
    const onFailure = (res) => {
        console.log('Login failure', res);
    }

    // Login with Facebook
    const responseFacebook = (response) => {
        console.log("login result", response);
        var obj = { emailAddress: response.email }
    }

    const componentClicked = (data) => {
        console.log(data);
       
    }


    // start of Login page logic
    const [user, setUser] = useState({});
    const [emailValidationMessage, setEmailValidationMessage] = useState('');
    const acceptChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(details => ({ ...details, [name]: value }));
        console.log(name);
        if (name == 'emailAddress') {
            //    let isValidEmail =  validator.isEmail(value);
            if (!validator.isEmail(value)) {
                setEmailValidationMessage("Please enter a valid email!");
            } else {
                setEmailValidationMessage("");
            }
            console.log(emailValidationMessage);
        }
    }
    const loginUser = (event) => {
        event.preventDefault();
        console.log(user);
        axios.post('http://localhost:3000/login', user)
            .then(response => {
                console.log(response.data);
                if (response.data) {
                    alert(response.data.message);
                    localStorage.setItem('token', response.data.token);
                    window.location.href = '/home';
                }
            })
            .catch(error => alert('Error! ' + error.response.data.error))
    }
    // end of Login page logic



    //Not used for Login page. Added in Signup already.
    //Start of signup page logic.
    const [userDetails, setUserDetails] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setUserDetails(values => ({ ...values, [name]: value }));
    }
    const registerUser = (event) => {
        event.preventDefault();
        console.log(userDetails);
    }

    const [errorMessage, setErrorMessage] = useState('')
    const validatePassword = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserDetails(details => ({ ...details, [name]: value }));
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorMessage('Strong Password');
        } else {
            setErrorMessage('Weak Password');
        }
    }

    const [errorMessage1, setErrorMessage1] = useState('');
    const validateConfirmPassword = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserDetails(details => ({ ...details, [name]: value }));
        console.log('password:', userDetails.password);
        console.log('confirm password:', value);
        if (userDetails.password != value) {
            setErrorMessage1('Passwords not matching')
        } else {
            setErrorMessage1('')
        }
    }
    const [message, setMessage] = useState('');
    const validateEmail = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserDetails(details => ({ ...details, [name]: value }));
        let isValidEmail = validator.isEmail(value);
        if (isValidEmail == false) {
            setMessage("Please enter a valid email!");
        } else {
            setMessage("");
        }
    }
    const [showPassword, setShowPassword] = useState(false);
    //End of Signup page logic

    return (
        <>
            <div>
                <div className="page-wrapper">
                    <header className="header">

                        <div className="header-middle">
                            <div className="container">
                                <div className="header-left col-lg-2 w-auto pl-0">
                                    <button className="mobile-menu-toggler text-primary mr-2" type="button">
                                        <i className="icon-menu" />
                                    </button>
                                    <a href="index-2.html" className="logo">
                                        <img src="assets/images/logo.png" alt="Porto Logo" />
                                    </a>
                                </div>{/* End .header-left */}
                            </div>{/* End .container */}
                        </div>{/* End .header-middle */}

                    </header>{/* End .header */}
                    <main className="main">
                        <nav aria-label="breadcrumb" className="breadcrumb-nav">
                            <div className="container">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index-2.html"><i className="icon-home" /></a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Login</li>
                                </ol>
                            </div>{/* End .container */}
                        </nav>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="heading">
                                        <h2 className="title">Login</h2>
                                        <p>If you have an account with us, please log in.</p>
                                    </div>{/* End .heading */}
                                    <form onSubmit={loginUser}>
                                        <input type="email" className="form-control" placeholder="Email Address" required
                                            name='emailAddress' value={user.emailAddress || ''} onChange={acceptChange} />
                                        {emailValidationMessage === '' ? null : <span style={{ fontSize: '1.2rem', color: 'red' }}>{emailValidationMessage}</span>}
                                        <input type="password" className="form-control" placeholder="Password" required
                                            name='password' value={user.password || ''} onChange={acceptChange} />
                                        <div className="form-footer">
                                            <button type="submit" className="btn btn-primary">LOGIN</button>
                                            <Link className="forget-pass" to="/forgot-password">Forgot Password?</Link>
                                            <span style={{ marginLeft: '3rem', marginRight: '0.6rem', color: 'black' }}  >Don't have an account?</span> <Link className="forget-pass" to="/sign-up">Signup</Link>

                                        </div>{/* End .form-footer */}
                                        <div style={{ paddingLeft: '16rem' }}>
                                            <GoogleLogin
                                                clientId={clientId} buttonText='Login With Google' isSignedIn={false} onSuccess={onSuccess} onFailure={onFailure}>
                                            </GoogleLogin>
                                        </div> <br />
                                        <div style={{ paddingLeft: '16rem' }}>
                                            <FacebookLogin appId='1759354777872352' fields='email,name,picture' onClick={componentClicked} callback={responseFacebook} />
                                        </div>
                                    </form>
                                </div>{/* End .col-md-6 */}
                                <div className="col-md-6" hidden>
                                    <div className="heading">
                                        <h2 className="title">Create An Account</h2>
                                        <p>By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</p>
                                    </div>
                                    {/* End .heading */}
                                    <form onSubmit={registerUser}>
                                        <input type="text" className="form-control" placeholder="First Name" required
                                            name='firstName' value={userDetails.firstName || ''} onChange={handleChange} />

                                        <input type="text" className="form-control" name='middleName' placeholder="Middle Name" required
                                            value={userDetails.middleName || ""} onChange={handleChange} />

                                        <input type="text" className="form-control" placeholder="Last Name" required name='lastName' value={userDetails.lastName || ''} onChange={handleChange} />

                                        <h2 className="title mb-2">Login information</h2>
                                        <input type="email" className="form-control" placeholder="Email Address" required name='email' value={userDetails.email || ''} onChange={(e) => validateEmail(e)} />
                                        {message === '' ? null : <span style={{ fontSize: '1.2rem', color: 'red' }}>{message}</span>}

                                        <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required onChange={e => validatePassword(e)} name='password' value={userDetails.password || ''} />
                                        {errorMessage === '' ? null : <span style={{ fontSize: '1.2rem', color: errorMessage == 'Weak Password' ? 'red' : 'green', }}>{errorMessage}</span>}

                                        <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Confirm Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required onChange={e => validateConfirmPassword(e)} name='confirmPassword' value={userDetails.confirmPassword || ''} />
                                        {errorMessage1 === '' ? null : <span style={{ fontSize: '1.2rem', color: 'red' }}>{errorMessage1}</span>}
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id='show-password' name="show-password" value={showPassword} onChange={() => setShowPassword((prev) => !prev)} />
                                            <label className="custom-control-label" htmlFor="show-password">Show password</label>
                                        </div>

                                        <div className="form-footer">
                                            <button type="submit" className="btn btn-primary" >Create Account</button>
                                        </div>
                                        {/* End .form-footer */}
                                    </form>

                                </div>{/* End .col-md-6 */}
                            </div>{/* End .row */}
                        </div>{/* End .container */}
                        <div className="mb-5" />{/* margin */}
                    </main>{/* End .main */}
                    <footer className="footer bg-dark">
                        <div className="footer-middle">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="widget">
                                            <h4 className="widget-title">Contact Info</h4>
                                            <ul className="contact-info">
                                                <li>
                                                    <span className="contact-info-label">Address</span>123 Street Name, City, England
                                                </li>
                                                <li>
                                                    <span className="contact-info-label">Phone</span>Toll Free <a href="tel:">(123) 456-7890</a>
                                                </li>
                                                <li>
                                                    <span className="contact-info-label">Email</span> <a href="mailto:mail@example.com">mail@example.com</a>
                                                </li>
                                                <li>
                                                    <span className="contact-info-label">Working Days/Hours</span>
                                                    Mon - Sun / 9:00AM - 8:00 PM
                                                </li>
                                            </ul>
                                            <div className="social-icons">
                                                <a href="#" className="social-icon social-instagram icon-instagram" target="_blank" title="Instagram" />
                                                <a href="#" className="social-icon social-twitter icon-twitter" target="_blank" title="Twitter" />
                                                <a href="#" className="social-icon social-facebook icon-facebook" target="_blank" title="Facebook" />
                                            </div>{/* End .social-icons */}
                                        </div>{/* End .widget */}
                                    </div>{/* End .col-lg-3 */}
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="widget">
                                            <h4 className="widget-title">Customer Service</h4>
                                            <ul className="links">
                                                <li><a href="#">Help &amp; FAQs</a></li>
                                                <li><a href="#">Order Tracking</a></li>
                                                <li><a href="#">Shipping &amp; Delivery</a></li>
                                                <li><a href="#">Orders History</a></li>
                                                <li><a href="#">Advanced Search</a></li>
                                                <li><a href="my-account.html">My Account</a></li>
                                                <li><a href="about.html">About Us</a></li>
                                                <li><a href="#">Careers</a></li>
                                                <li><a href="#">Corporate Sales</a></li>
                                                <li><a href="#">Privacy</a></li>
                                            </ul>
                                        </div>{/* End .widget */}
                                    </div>{/* End .col-lg-3 */}
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="widget">
                                            <h4 className="widget-title">Popular Tags</h4>
                                            <div className="tagcloud">
                                                <a href="#">Bag</a>
                                                <a href="#">Black</a>
                                                <a href="#">Blue</a>
                                                <a href="#">Clothes</a>
                                                <a href="#">Hub</a>
                                                <a href="#">Shirt</a>
                                                <a href="#">Shoes</a>
                                                <a href="#">Skirt</a>
                                                <a href="#">Sports</a>
                                                <a href="#">Sweater</a>
                                            </div>
                                        </div>{/* End .widget */}
                                    </div>{/* End .col-lg-3 */}
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="widget widget-newsletter">
                                            <h4 className="widget-title">Subscribe newsletter</h4>
                                            <p>Get all the latest information on events, sales and offers. Sign up for newsletter:</p>
                                            <form action="#" className="mb-0">
                                                <input type="email" className="form-control m-b-3" placeholder="Email address" required />
                                                <input type="submit" className="btn btn-primary shadow-none" defaultValue="Subscribe" />
                                            </form>
                                        </div>{/* End .widget */}
                                    </div>{/* End .col-lg-3 */}
                                </div>{/* End .row */}
                            </div>{/* End .container */}
                        </div>{/* End .footer-middle */}
                        <div className="container">
                            <div className="footer-bottom d-flex justify-content-between align-items-center flex-wrap">
                                <p className="footer-copyright py-3 pr-4 mb-0">© Porto eCommerce. 2020. All Rights Reserved</p>
                                <img src="assets/images/payments.png" alt="payment methods" className="footer-payments py-3" />
                            </div>{/* End .footer-bottom */}
                        </div>{/* End .container */}
                    </footer>{/* End .footer */}
                </div>{/* End .page-wrapper */}
                <div className="mobile-menu-overlay" />{/* End .mobil-menu-overlay */}
                <div className="mobile-menu-container">
                    <div className="mobile-menu-wrapper">
                        <span className="mobile-menu-close"><i className="icon-cancel" /></span>
                        <nav className="mobile-nav">
                            <ul className="mobile-menu">
                                <li><a href="index-2.html">Home</a></li>
                                <li>
                                    <a href="category.html">Categories</a>
                                    <ul>
                                        <li><a href="https://www.portotheme.com/html/porto_ecommerce/demo_5/category-banner-full-width.html">Full Width Banner</a></li>
                                        <li><a href="category-banner-boxed-slider.html">Boxed Slider Banner</a></li>
                                        <li><a href="category-banner-boxed-image.html">Boxed Image Banner</a></li>
                                        <li><a href="https://www.portotheme.com/html/porto_ecommerce/demo_5/category-sidebar-left.html">Left Sidebar</a></li>
                                        <li><a href="category-sidebar-right.html">Right Sidebar</a></li>
                                        <li><a href="category-flex-grid.html">Product Flex Grid</a></li>
                                        <li><a href="category-horizontal-filter1.html">Horizontal Filter 1</a></li>
                                        <li><a href="category-horizontal-filter2.html">Horizontal Filter 2</a></li>
                                        <li><a href="#">List Types</a></li>
                                        <li><a href="category-infinite-scroll.html">Ajax Infinite Scroll<span className="tip tip-new">New</span></a></li>
                                        <li><a href="category.html">3 Columns Products</a></li>
                                        <li><a href="category-4col.html">4 Columns Products</a></li>
                                        <li><a href="category-5col.html">5 Columns Products</a></li>
                                        <li><a href="category-6col.html">6 Columns Products</a></li>
                                        <li><a href="category-7col.html">7 Columns Products</a></li>
                                        <li><a href="category-8col.html">8 Columns Products</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="product.html">Products</a>
                                    <ul>
                                        <li>
                                            <a href="#">Variations</a>
                                            <ul>
                                                <li><a href="product.html">Horizontal Thumbs</a></li>
                                                <li><a href="product-full-width.html">Vertical Thumbnails<span className="tip tip-hot">Hot!</span></a></li>
                                                <li><a href="product.html">Inner Zoom</a></li>
                                                <li><a href="product-addcart-sticky.html">Addtocart Sticky</a></li>
                                                <li><a href="product-sidebar-left.html">Accordion Tabs</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">Variations</a>
                                            <ul>
                                                <li><a href="product-sticky-tab.html">Sticky Tabs</a></li>
                                                <li><a href="product-simple.html">Simple Product</a></li>
                                                <li><a href="product-sidebar-left.html">With Left Sidebar</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">Product Layout Types</a>
                                            <ul>
                                                <li><a href="product.html">Default Layout</a></li>
                                                <li><a href="product-extended-layout.html">Extended Layout</a></li>
                                                <li><a href="product-full-width.html">Full Width Layout</a></li>
                                                <li><a href="product-grid-layout.html">Grid Images Layout</a></li>
                                                <li><a href="product-sticky-both.html">Sticky Both Side Info<span className="tip tip-hot">Hot!</span></a></li>
                                                <li><a href="product-sticky-info.html">Sticky Right Side Info</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">Pages<span className="tip tip-hot">Hot!</span></a>
                                    <ul>
                                        <li><a href="cart.html">Shopping Cart</a></li>
                                        <li>
                                            <a href="#">Checkout</a>
                                            <ul>
                                                <li><a href="checkout-shipping.html">Checkout Shipping</a></li>
                                                <li><a href="checkout-shipping-2.html">Checkout Shipping 2</a></li>
                                                <li><a href="checkout-review.html">Checkout Review</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="about.html">About</a></li>
                                        <li><a href="#" className="login-link">Login</a></li>
                                        <li><a href="forgot-password.html">Forgot Password</a></li>
                                    </ul>
                                </li>
                                <li><a href="blog.html">Blog</a>
                                    <ul>
                                        <li><a href="single.html">Blog Post</a></li>
                                    </ul>
                                </li>
                                <li><a href="contact.html">Contact Us</a></li>
                                <li><a href="#">Special Offer!<span className="tip tip-hot">Hot!</span></a></li>
                                <li><a href="https://1.envato.market/DdLk5" target="_blank">Buy Porto!<span className="tip tip-new">New</span></a></li>
                            </ul>
                        </nav>{/* End .mobile-nav */}
                        <div className="social-icons">
                            <a href="#" className="social-icon" target="_blank"><i className="icon-facebook" /></a>
                            <a href="#" className="social-icon" target="_blank"><i className="icon-twitter" /></a>
                            <a href="#" className="social-icon" target="_blank"><i className="icon-instagram" /></a>
                        </div>{/* End .social-icons */}
                    </div>{/* End .mobile-menu-wrapper */}
                </div>{/* End .mobile-menu-container */}
                {/* Add Cart Modal */}
                <div className="modal fade" id="addCartModal" tabIndex={-1} role="dialog" aria-labelledby="addCartModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body add-cart-box text-center">
                                <p>You've just added this product to the<br />cart:</p>
                                <h4 id="productTitle" />
                                <img src="#" id="productImage" width={100} height={100} alt="adding cart image" />
                                <div className="btn-actions">
                                    <a href="cart.html"><button className="btn-primary">Go to cart page</button></a>
                                    <a href="#"><button className="btn-primary" data-dismiss="modal">Continue</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><a id="scroll-top" href="#top" title="Top" role="button"><i className="icon-angle-up" /></a></>

    )
}
export default Login