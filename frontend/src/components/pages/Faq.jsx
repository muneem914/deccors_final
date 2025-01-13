import React, { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import MainFrame from "../layout/MainFrame";
import PageFrame from "../layout/PageFrame";

import { AiOutlineDollar } from "react-icons/ai";
import { PiPackageLight } from "react-icons/pi";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { TbIroning2 } from "react-icons/tb";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { BsArrowReturnLeft } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";

import "./pages.scss";
import { Box, Typography } from "@mui/material";

const Faq = () => {
  const faqData = [
    {
      id: "panel1",
      header: "Payment",
      icon: <AiOutlineDollar />,
      details: [
        {
          question: "Which forms of payment are accepted?",
          answer:
            "Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Sed velit dignissim sodales ut eu sem integer. Amet consectetur adipiscing elit pellentesque habitant morbi.",
        },
        {
          question: "What information is needed for payment?",
          answer:
            "Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Arcu vitae elementum curabitur vitae. Urna condimentum mattis pellentesque id nibh tortor id aliquet.",
        },
      ],
    },
    {
      id: "panel2",
      header: "Returns & Exchange",
      icon: <BsArrowReturnLeft />,
      details: [
        {
          question: "Could I exchange it or send it back?",
          answer:
            "Faucibus ornare suspendisse sed nisi lacus sed viverra. Ultricies integer quis auctor elit sed. Felis eget velit aliquet sagittis id. Vel facilisis volutpat est velit. Donec ultrices tincidunt arcu non.Blandit libero volutpat sed cras ornare.",
        },
        {
          question: "Do you allow exchanges?",
          answer:
            "Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Quisque id diam vel quam elementum pulvinar etiam non quam. A arcu cursus vitae congue. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam.",
        },
      ],
    },
    {
      id: "panel3",
      header: "Special Offers",
      icon: <MdOutlineLocalOffer />,
      details: [
        {
          question: "Are there any special offers or price reductions?",
          answer:
            "Tincidunt praesent semper feugiat nibh sed pulvinar proin. Mi bibendum neque egestas congue quisque. Et sollicitudin ac orci phasellus.Eget nullam non nisi est sit amet facilisis magna etiam.",
        },
        {
          question: "Do you replenish sold-out items?",
          answer:
            "Suspendisse sed nisi lacus sed viverra tellus in. Id ornare arcu odio ut sem nulla pharetra diam. Volutpat odio facilisis mauris sit amet massa vitae.Leo duis ut diam quam nulla porttitor massa.",
        },
      ],
    },
    {
      id: "panel4",
      header: "Shipment",
      icon: <LiaShippingFastSolid />,
      details: [
        {
          question:
            "What are the shipping charges?What are the shipping charges?",
          answer:
            "Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Mauris in aliquam sem fringilla. Scelerisque felis imperdiet proin fermentum leo vel orci porta non.",
        },
        {
          question: "Do you provide shipping to other countries?",
          answer:
            "Magna etiam tempor orci eu lobortis elementum nibh tellus. Tellus cras adipiscing enim eu turpis egestas. Tincidunt nunc pulvinar sapien et ligula.",
        },
      ],
    },
    {
      id: "panel5",
      header: "Customer Care Service",
      icon: <FaRegUser />,
      details: [
        {
          question: "How do I connect to your customer care service?",
          answer:
            "During business hours, you can reach our customer service team by phone, email, or live chat. We are presently to answer any questions or address any issues you may possess. Or just have access to our contact page fill the form to reach us.",
        },
        {
          question: "How can I contact your customer support department?",
          answer:
            "Convallis posuere morbi leo urna molestie at. Nisi porta lorem mollis aliquam ut porttitor. Tristique sollicitudin nibh sit amet commodo nulla facilisi.",
        },
      ],
    },
    {
      id: "panel6",
      header: "Order",
      icon: <PiPackageLight />,
      details: [
        {
          question: "How can I follow up on my order?",
          answer:
            "Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Sed velit dignissim sodales ut eu sem integer. Amet consectetur adipiscing elit pellentesque habitant morbi.",
        },
        {
          question: "Can I cancel my order?",
          answer:
            "Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Arcu vitae elementum curabitur vitae. Urna condimentum mattis pellentesque id nibh tortor id aliquet.",
        },
      ],
    },
    {
      id: "panel7",
      header: "Package",
      icon: <HiOutlineClipboardDocumentCheck />,
      details: [
        {
          question: "How are custom orders handled by package?",
          answer:
            "Faucibus ornare suspendisse sed nisi lacus sed viverra. Ultricies integer quis auctor elit sed. Felis eget velit aliquet sagittis id. Vel facilisis volutpat est velit. Donec ultrices tincidunt arcu non.Blandit libero volutpat sed cras ornare.",
        },
        {
          question: "What range of products does package offer?",
          answer:
            "Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Quisque id diam vel quam elementum pulvinar etiam non quam. A arcu cursus vitae congue. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam.",
        },
      ],
    },
    {
      id: "panel8",
      header: "Damage",
      icon: <TbIroning2 />,
      details: [
        {
          question: "What is the duration of your warranty?",
          answer:
            "Tincidunt praesent semper feugiat nibh sed pulvinar proin. Mi bibendum neque egestas congue quisque. Et sollicitudin ac orci phasellus.Eget nullam non nisi est sit amet facilisis magna etiam.",
        },
        {
          question: "What are the terms and conditions of your warranty?",
          answer:
            "Suspendisse sed nisi lacus sed viverra tellus in. Id ornare arcu odio ut sem nulla pharetra diam. Volutpat odio facilisis mauris sit amet massa vitae.Leo duis ut diam quam nulla porttitor massa.",
        },
      ],
    },
    {
      id: "panel9",
      header: "Purchase",
      icon: <MdOutlineLocalOffer />,
      details: [
        {
          question: "Can I have a sample order ?",
          answer:
            "Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Mauris in aliquam sem fringilla. Scelerisque felis imperdiet proin fermentum leo vel orci porta non.",
        },
        {
          question: "Does your product install easily?",
          answer:
            "Magna etiam tempor orci eu lobortis elementum nibh tellus. Tellus cras adipiscing enim eu turpis egestas. Tincidunt nunc pulvinar sapien et ligula.",
        },
      ],
    },
    {
      id: "panel10",
      header: "Refund",
      icon: <HiOutlineReceiptRefund />,
      details: [
        {
          question: "How can I get my money back?",
          answer:
            "During business hours, you can reach our customer service team by phone, email, or live chat. We are presently to answer any questions or address any issues you may possess. Or just have access to our contact page fill the form to reach us.",
        },
        {
          question:
            "What are the shipping costs if I want to return something?",
          answer:
            "Convallis posuere morbi leo urna molestie at. Nisi porta lorem mollis aliquam ut porttitor. Tristique sollicitudin nibh sit amet commodo nulla facilisi.",
        },
      ],
    },
  ];

  const middleIndex = Math.ceil(faqData.length / 2);
  const firstHalf = faqData.slice(0, middleIndex);
  const secondHalf = faqData.slice(middleIndex);

  return (
    <>
      <MetaData title="Frequently Asked Questions" />
      <PageFrame>
        <div className="imageContainer faq">
          <div className="row">
            <h1>Faq</h1>
            <p>
              <Link to="/">Home</Link> <span>|</span> faq
            </p>
          </div>
        </div>
        <MainFrame>
          <Box sx={{ py: 10 }} className="accordionContainer">
            <Box className="accordionColumn">
              {firstHalf.map((data) => (
                <Accordion key={data.id} >
                  <AccordionSummary
                    className="accordionHeader"
                    expandIcon={<ExpandMoreIcon id="expandIcon" />}
                    aria-controls={`${data.id}-content`}
                    id={`${data.id}-header`}
                  >
                    <h4>
                      {data.icon} {data.header}
                    </h4>
                  </AccordionSummary>
                  <AccordionDetails>
                    {data.details.map((subData, index) => (
                      <div key={index}>
                        <h5>{subData.question}</h5>
                        <p>{subData.answer}</p>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
            <Box className="accordionColumn">
              {secondHalf.map((data) => (
                <Accordion key={data.id}>
                  <AccordionSummary
                    className="accordionHeader"
                    expandIcon={<ExpandMoreIcon id="expandIcon" />}
                    aria-controls={`${data.id}-content`}
                    id={`${data.id}-header`}
                  >
                    <h4>
                      {data.icon} {data.header}
                    </h4>
                  </AccordionSummary>
                  <AccordionDetails>
                    {data.details.map((subData, index) => (
                      <div key={index}>
                        <h5>{subData.question}</h5>
                        <p>{subData.answer}</p>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        </MainFrame>
      </PageFrame>
    </>
  );
};

export default Faq;
