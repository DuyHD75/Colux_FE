import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import textConfigs from '../config/text.config'
import { FaChevronRight } from "react-icons/fa6";

const TermsAndConditions = () => {
    return (
        <Box p={{ xs: '56px 10px 16px 10px', md: '110px 375.5px 16px 375.5px' }} bgcolor='#0000' minHeight='inherit'>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', mb: '2rem' }}>
                <Typography id="section" sx={{ scrollMarginTop: '96px', ...textConfigs.style.headerText, fontWeight: 'bold', textAlign: 'center' }} variant='h2'>Terms and Conditions</Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '16px', mt: '5px', textAlign: 'center' }}>Last Updated May 23rd, 2024</Typography>
            </Box>
            <Box width='100%'>
                <Typography id="section1" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem' }}>Binding agreement</Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                    If you order any Products using the Website, or if you pick up, accept delivery of, pay for or use any Products that you have ordered from the Website, then you have agreed to accept and be legally bound by these Terms & Conditions and the Website Terms of Use and Privacy Policy. However, if you have entered into a written supply agreement that has been executed and delivered by you and an authorized representative of Sherwin-Williams (“Supply Agreement”), that agreement will supersede these Terms & Conditions to the extent of any conflict with these Terms & Conditions, or the Website Terms of Use and Privacy Policy. Absent such a Supply Agreement, these Terms & Conditions, along with the provisions, if any, contained in the applicable Sherwin-Williams order confirmation email, and our Website Terms of Use and Privacy Policy, constitute the final, entire and exclusive agreement between you and Sherwin-Williams concerning the sale of Products by Sherwin-Williams to you. These Terms & Conditions, together with the Website Terms of Use and Privacy Policy, supersede all prior oral and written agreements and understandings (whether express or implied, including those implied by law or through usage of trade). In particular, no course of prior dealings between the parties and no usage of trade will be relevant in determining the meaning of this agreement. In the event of a conflict between the Terms & Conditions and the Website Terms of Use, any express terms of these Terms & Conditions will prevail with respect to Products (including, without limitation, sale and delivery).                </Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                    <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                        onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                    >
                        Back to top
                        <span
                            style={{
                                display: 'inline-block',
                                transition: 'transform 0.3s ease-in-out',
                                marginLeft: '5px',
                            }}
                        >
                            <FaChevronRight />
                        </span>
                    </a>
                </Typography>
                <Divider />
                <Typography id="section2" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem', mt: '1.5rem' }}>Amendments and changes</Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                    We may supplement these Terms & Conditions by posting additional terms, such as Product-specific terms and terms of special offers, (“Additional Terms”) on the Website. In the event of a conflict between the Terms & Conditions and applicable Additional Terms, any express terms of the Additional Terms will prevail. Any attempted modification or amendment of these Terms & Conditions by you (whether by means of a purchase order or other form or document), other than as part of a Supply Agreement, is hereby rejected. No waiver, alteration or modification of these Terms & Conditions shall be binding on Sherwin-Williams unless made in writing and signed by an authorized representative of Sherwin-Williams. These Terms & Conditions, and the Website Terms of Use and Privacy Policy, are subject to prospective change by Sherwin-Williams, in our sole discretion, except that the Terms & Conditions, Terms of Use and Privacy Policy posted on the Website at the time you place an order will govern the order in question. You agree that posting of revised versions on the Website is sufficient notice of any changes. You should review the Terms & Conditions and other Website terms, policies and notices prior to each time you purchase any Product that is available through the Website and your use of the Website will constitute your acceptance of and agreement to the then current version of the Terms & Conditions.
                </Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                    <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                        onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                    >
                        Back to top
                        <span
                            style={{
                                display: 'inline-block',
                                transition: 'transform 0.3s ease-in-out',
                                marginLeft: '5px',
                            }}
                        >
                            <FaChevronRight />
                        </span>
                    </a>
                </Typography>
                <Divider />
                <Typography id="section3" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem', mt: '1.5rem' }}>Product Orders</Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                    Not all Products listed on the Website are available for purchase in all jurisdictions in which we operate our brick-and-mortar Sherwin-Williams-branded retail stores (each, a “Retail Store”). In addition, Sherwin-Williams cannot guaranty that Products shown on the Website as in stock are available for immediate shipping, pick up, or delivery at or to all of our Retail Stores, or otherwise available, at all times. Applicable law in some jurisdictions limits the quantities of some Products that you may purchase or requires that you provide proof of identity or age in order to make a purchase. If so, such requirements are a condition of purchase and/or delivery. You agree that your order is an offer to buy, under these Terms & Conditions, all Products that you have selected, added to your cart, and that are listed in your online order. We reserve the right to reject any offer and our acceptance is subject to and conditioned upon your payment in full, fulfillment of any applicable legal requirements (e.g., age verification), your agreement to be legally bound by these Terms & Conditions, and our confirmation as set forth in the next section. We may choose not to accept any orders in our sole discretion. We require that all purchases of Products be made by individuals who are not minors and who can legally enter into binding contracts (typically persons 18 years of age or older, depending on where you live).                </Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                    <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                        onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                    >
                        Back to top
                        <span
                            style={{
                                display: 'inline-block',
                                transition: 'transform 0.3s ease-in-out',
                                marginLeft: '5px',
                            }}
                        >
                            <FaChevronRight />
                        </span>
                    </a>
                </Typography>
                <Divider />
                <Typography id="section4" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem', mt: '1.5rem' }}>Orders Confirmation and Cancellation</Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                    (a) Confirmation. For orders which are to be picked up in a Retail Store or delivered from a Retail Store to your home, we will send you an order confirmation e-mail after we receive your online order with your order number, a description of the Products you have ordered, the location of the Retail Store where you can pick up the Products you have ordered online, or information on your selected delivery option, if applicable. Acceptance of your order and the formation of the contract of sale between Sherwin-Williams and you will not take place until the servicing Sherwin-Williams store reviews and processes your order.
                </Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                    For orders which are to be shipped directly to the shipping address you supply on http://www.swsamples.com (“E-Commerce Orders”), we will send you an order confirmation email after we have received your online order with your order number, a description of the Products you have ordered, and your shipping and billing addresses. Except as otherwise specified below, all E-Commerce Orders are final at the time your payment is accepted online and there are no returns or refunds.
                </Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                    (b) Cancelation, Delivery Delays and Redelivery. With the exception of orders for tinted Products, special orders (“Custom Orders”), E-Commerce Orders, or as otherwise set forth in any applicable Additional Terms, you have the option to cancel your order at any time prior to pick up in our Retail Store, or prior to receipt of delivery window confirmation, which you will receive either via (i) phone call from your Retail Store, (ii) text to the phone number you provided at checkout, or (iii) email, by calling your Retail Store and notifying them of your intent to cancel your order. E-Commerce Orders and Custom Orders cannot be cancelled by you once the order is placed online. You agree that we may cancel any online order at any time, even if it has been accepted by Sherwin-Williams and even if you have received an email order confirmation, if: (i) we believe that the order violates applicable law, including any law that requires proof of identity or age in order to purchase a particular Product or laws limiting the sale of certain products in defined jurisdictions; (ii) we discover an error related to your order or if we are not able to fill the order, including E-Commerce Orders, to the specifications (e.g., quantity, size, color, sheen, and/or base) you have selected (in which case, we may contact you and offer an alternative, but are not obligated to do so except as required by applicable law); or (iii) if you have not picked up or scheduled delivery, or received delivery of the Product after the delivery attempt, if applicable, within fourteen (14) days after the date of your order. We will attempt to deliver or make available for pick up all Products within thirty (30) days of order confirmation, typically sooner. With the exception of E-Commerce Orders, if we are unable to make available for pick up or deliver Products within 30 days, we will provide you notice with an estimate of when the Products will be available and permit you to elect a refund or to accept delayed delivery. Refunds and cancelation of credit holds for canceled orders will be as set forth in Section 6 and 7 or any applicable Additional Terms.
                </Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                    (c) Custom Orders. Custom Orders cannot be cancelled by you and must be scheduled for delivery or picked up at the Retail Store specified in your order confirmation email within fourteen (14) days of the date of your online order. If a Custom Order is not picked up or scheduled to be delivered within such fourteen-day period, Sherwin-Williams may: (i) cancel all or any part of your online order; (ii) charge your Account for the full amount of the Products that are Custom Order (including all taxes and fees associated with such Custom Order); and (iii) dispose of such Custom Order Products as Sherwin-Williams deems fit, in its sole and absolute discretion. You agree to pay for all Products that are Custom Orders in full in accordance with these Terms & Conditions. E-Commerce Orders are not Custom Orders.
                </Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                    <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                        onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                    >
                        Back to top
                        <span
                            style={{
                                display: 'inline-block',
                                transition: 'transform 0.3s ease-in-out',
                                marginLeft: '5px',
                            }}
                        >
                            <FaChevronRight />
                        </span>
                    </a>
                </Typography>
                <Divider />
                <Typography id="section5" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem', mt: '1.5rem' }}>Prices and Taxes</Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                    The price charged for a Product, and applicable taxes, will be the price and taxes in effect at the time your order is placed and will be specified during the checkout process and in your order confirmation e-mail. Taxes shown during the checkout process and in your order confirmation email are estimated; actual taxes will be calculated upon pick up in the Retail Store, or, if a delivery option is chosen, will be calculated based upon your selected delivery location. This also applies to tax exemptions or other circumstances affecting the existence of tax (e.g., tax holidays) applicable to your order, which may change between the time of placement of your order and the time of completion of your order via pick up or delivery. Tax exemptions may not apply if the sales transaction is not completed through final pick up or delivery on the day that is designated for tax exemption. Nominal fees, such as carryout bag fees or public improvement fees, may be added if required by law in your store’s jurisdiction and will be calculated upon pick up in the Retail Store or, if applicable, upon delivery. Price increases will only apply to orders placed after such changes are posted on the Website. All prices posted on the Website are subject to change without notice. Prices and Product descriptions are subject to correction for error. As permitted by applicable law, we are not responsible for any pricing, typographical, photographical or other errors in our Website information. If we discover errors, we may contact you and give you the option to cancel or revise your order, and we reserve the right to cancel any orders arising from any such errors. For paint Products displayed on the Website, the Product size listed on the website is the size of the Product container. The actual volume of the Product purchased may be smaller than the Product size that is listed on the Website so that we can leave room in the container to add tint in the store. Payment for the Products shall be made in U.S. dollars. Prior to submitting your payment information, you will have the opportunity to review Product prices and taxes. In the event that we are unable to display taxes during the online checkout process, you will be notified of this during checkout, and you will receive a final invoice including all taxes and fees when you pick up the Products in a Retail Store or upon receipt of your delivered Products.                </Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                    <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                        onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                    >
                        Back to top
                        <span
                            style={{
                                display: 'inline-block',
                                transition: 'transform 0.3s ease-in-out',
                                marginLeft: '5px',
                            }}
                        >
                            <FaChevronRight />
                        </span>
                    </a>
                </Typography>
                <Divider />
                <Typography id="section6" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem', mt: '1.5rem' }}>Terms of Payment</Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                    Your credit card, or, for professional customers, your Sherwin-Williams credit account (“Account”) will be authorized for the full amount of the sale when the online checkout process is completed. With the exception of E-Commerce Orders, Sherwin-Williams will charge your Account only upon the earlier of: (i) the date the Products are picked up at the Retail Store; (ii) the date the Products are delivered to the location specified at checkout; or (iii) the date your order is cancelled by Sherwin-Williams pursuant to the terms set forth in Section 4(b)(iii) or 4(c). E-Commerce Orders will be charged to your credit card when shipped. If you timely cancel an order as set forth in Section 4(b), or we cancel your order for any reason other than as set forth in Section 4(b)(iii), 4(c), or otherwise provided in applicable Additional Terms, your Account will be refunded or the credit hold removed, as applicable. It may take several days before the credit hold is released on, or a refund is posted to, your Account. Sherwin-Williams shall not be liable for any costs or other liabilities associated with such a continuing hold. If your credit card expires before you pick up the Products in the designated Retail Store or prior to the delivery of your Products, as applicable, we may notify you and require that you enter the credit card number again with the new expiration date. You acknowledge that it is possible that the final amount charged to your Account may be more or less than the amount originally authorized at the time the online checkout process is completed. This may occur, for example, if the actual taxes applicable to an ordered Product charged at pick up or delivery are more or less than the estimated taxes shown online, if the non-tax state or territory fees applicable to an ordered Product have changed between the date of your order and the date of pick up or delivery, if certain fees such as carryout bag or public improvement fees are required by law in your store’s jurisdiction, or if you make changes to your order at the Retail Store during pick up (for example, you use a coupon to reduce the price of your purchase).
                </Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                    <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                        onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                    >
                        Back to top
                        <span
                            style={{
                                display: 'inline-block',
                                transition: 'transform 0.3s ease-in-out',
                                marginLeft: '5px',
                            }}
                        >
                            <FaChevronRight />
                        </span>
                    </a>
                </Typography>
                <Divider />
                <Typography id="section7" sx={{ scrollMarginTop: '96px', ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '36px', mb: '1.5rem', mt: '1.5rem' }}>Delivery, Title and risk of loss</Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', mb: '0.5rem' }}>
                    Sherwin-Williams will arrange for the Products to be made available for pick up at the Retail Store designated at the time you checkout online; or, if the delivery option is chosen, Sherwin-Williams or its designated third-party provider will deliver your Products to your specified location. E-Commerce Orders will be shipped via USPS and title and risk of loss shall pass to you upon our placing of the Products with the carrier. For Products other than E-Commerce Orders, delivery will occur on the date and time scheduled by Sherwin-Williams via email or phone, unless you call to cancel your order as set forth in Section 4(b). For assistance in tracking a delivery, contact our online customer service as set forth in Section 15(a); however, it is your responsibility to monitor the status of your order. You are responsible for picking up the Products from the Retail Store specified in our order confirmation email, or for being present at the specified delivery location at the time of Delivery. If you are not present at the delivery location, Sherwin-Williams may leave the Products at your delivery location unless explicitly instructed by you not to do so, or may return your order to the Retail Store designated at the time of checkout. In that case, we will call you to reschedule your delivery, and if we cannot reach you, we may cancel your order and as set forth in Section 4. You warrant that either you or your representative shall have the right to accept delivery of your order, are at least 18 years of age or older, and upon request, will provide (i) a signature acknowledging receipt of your order, (ii) appropriate identification, and (iii) a copy of your order confirmation email. You acknowledge that you will be responsible for re-ordering any items that are returned to us as undeliverable. Title and risk of loss for the Products pass to you upon our transfer of the Products to you in the Retail Store, or, if you have opted to receive your Products via delivery, and they are not E-Commerce Orders, title and risk of loss of the Products shall pass upon delivery to the address you specified, regardless of whether you receive the delivery in-person or the Products are left at your delivery address. The time of delivery is not of the essence, and Sherwin-Williams shall not be liable or responsible for any costs, charges, expenses, damages or for any penalty, liquidated or otherwise, for late or delayed delivery. All delivery dates, including any delivery dates specified in your order confirmation email, are approximate and are not guaranteed. For orders other than E-Commerce Orders, we will call you if we need to cancel your order or reschedule your delivery for any reason, and if we cannot reach you to reschedule your delivery after reasonable attempts to do so, we will cancel your order in accordance with Section 4(b) and provide you with a refund as set forth below.
                </Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '18px', my: '1.5rem' }}>
                    <a href='#section' style={{ display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(8px)'}
                        onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                    >
                        Back to top
                        <span
                            style={{
                                display: 'inline-block',
                                transition: 'transform 0.3s ease-in-out',
                                marginLeft: '5px',
                            }}
                        >
                            <FaChevronRight />
                        </span>
                    </a>
                </Typography>
            </Box>

        </Box >)
}

export default TermsAndConditions