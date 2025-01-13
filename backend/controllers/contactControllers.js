import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Contact from "../models/contact.js";
import ErrorHandler from "../utils/errorHandler.js";


// add or update message => /api/v1/contact
export const addOrUpdateMessage = catchAsyncErrors(async (req, res, next) => {
  const { name, email, message } = req.body;

  let contact = await Contact.findOne({ email });

  if (contact) {
    // Update existing contact
    contact.messages.push({ name, message });
    await contact.save();
  } else {
    // Create new contact
    contact = await Contact.create({
      name,
      email,
      messages: [{ name, message }],
    });
  }

  res.status(200).json({
    success: true,
    contact,
  });
});

// get all messaages => /api/v1/admin/contacts
export const getAllContacts = catchAsyncErrors(async (req, res, next) => {
  const contacts = await Contact.find();

  if (!contacts) {
    return next(new ErrorHandler("No contacts found", 404));
  }

  res.status(200).json({
    success: true,
    contacts,
  });
});

// get single user messaages => /api/v1/admin/contacts/:id
export const getContactDetails = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    contact,
  });
});
// delete single contact with messaages => /api/v1/admin/contacts/:id
export const deleteContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.findById(req?.params?.id);

  if (!contact) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );
  }
  await contact.deleteOne();

  res.status(200).json({
    success: true,
  });
});