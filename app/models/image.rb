class Image < ApplicationRecord
  belongs_to :user
  mount_uploader :picture, PictureUploader
  validate :picture_size

  private

  def picture_size
    errors.add(:picture, 'Should be smaller than 5MB') if picture.size > 5.megabytes
  end
end
