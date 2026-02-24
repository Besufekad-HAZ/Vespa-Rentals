
class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.date :start_date
      t.date :end_date
      t.string :city
      t.timestamps

      t.references :user, null: false, foreign_key: true
      t.references :motorcycle, null: false, foreign_key: true
    end
  end
end
