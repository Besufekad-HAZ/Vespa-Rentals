class CreateMotorcycles < ActiveRecord::Migration[7.0]
  def change
    create_table :motorcycles do |t|
      t.string :name
      t.string :model
      t.text :description
      t.string :photo
      t.timestamps

      t.references :user, null: false, foreign_key: true
    end
  end
end
