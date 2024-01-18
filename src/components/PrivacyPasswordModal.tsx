import { Form } from "react-router-dom";

interface ModalProps {
  newPassword: string;
  handlePasswordValidation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const PrivacyPasswordModal = ({
  newPassword,
  handlePasswordChange,
  handlePasswordValidation,
  handleSubmit,
}: ModalProps) => {
  return (
    <div id="password-main" className="text-medium-grey w-full">
      <p className="mb-4">
        This action will require you to log into your account again.
      </p>
      <Form
        method="put"
        id="password-change-form"
        className="form px-0"
        onSubmit={handleSubmit}
      >
        <label className="mb-2 text-body-m">Confirm your old password</label>
        <input
          id="confirm_password"
          name="oldPassword"
          type="password"
          onChange={handlePasswordValidation}
          required
          autoFocus
          className="form-input"
        ></input>
        <span id="message"></span>

        <label className="mb-2 text-body-m">Your new password</label>
        <input
          type="password"
          className="form-input"
          value={newPassword}
          onChange={handlePasswordChange}
          required
        ></input>
        <div
          id="password-form-btns"
          className="flex justify-between w-full mt-10"
        >
          <button
            className="bg-main-purple text-white rounded-full py-2 px-3"
            type="submit"
          >
            Confirm
          </button>
          <button className="bg-destructive-red text-white rounded-full px-3 py-2">
            Cancel
          </button>{" "}
        </div>
      </Form>
    </div>
  );
};

export default PrivacyPasswordModal;
